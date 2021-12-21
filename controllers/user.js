import Users from '../models/User';
import {WORK, ADMIN} from "../types/roles";
import bcrypt from "bcrypt";
import Roles from "../models/Role";

export class UserController {
    async create(req, res) {
        try {
            const {fullName, email, password, role = ADMIN} = req.body;
            const candidate = await Users.findOne({email});
            if (candidate) {
                return res.status(409).json({message: "A user with this username already exists"});
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const userRole = await Roles.findOne({slug: role})
            if (!userRole) {
                return res.status(403).json({message: "A role doesn't exists"});
            }
            const user = new Users({fullName, email, password: hashPassword, role: userRole});
            await user.save();
            return res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: {name: user.role.name, slug: user.role.slug}
            });
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Create error'});
        }
    }
    async update(req, res) {
        try {
            const _id = req.params.id
            const {fullName, email, password, role} = req.body
            const hashPassword = bcrypt.hashSync(password, 10);
            const rl = await Roles.findOne({slug: role})
            const user = await Users.findOneAndUpdate(
                {_id},
                { $set:{ fullName, email, password: hashPassword, role: rl }},
                { upsert: true, new: true }
            ).select('-password').populate({path: 'role', select:'name slug -_id'})
            return res.status(200).json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update error'});
        }
    }
    async getAll(req, res) {
        try {
            const {offset = 0, limit, search, column, sort} = req.query;
            const searching = search ? {$text: {$search: search}} : {}
            const sorting = column && sort ? {[column]: sort} : {}
            let response = {
                totalItems: null,
                users: null
            };
            response.users = limit ?
                await Users.find(searching)
                    .select('-password')
                    .populate({path:'role', select:'name slug -_id'})
                    .sort(sorting)
                    .limit(Number(limit))
                    .skip(Number(offset)) :
                await Users.find(searching)
                    .select('-password')
                    .populate({path:'role', select:'name slug -_id'})
                    .sort(sorting)
            response.totalItems = await Users.find(searching).count();

            return res.status(200).json(response)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    }
    async getById(req, res) {
        try {
            const _id = req.params.id
            const user = await Users.findOne({_id})
                .select('-password')
                .populate({path:'role', select:'name slug -_id'})
            return res.status(200).json({fullName: user.fullName, email: user.email, role: user.role})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    }

    async delete(req, res) {
        try {
            const _id = req.params.id
            await Users.findOneAndRemove({_id})
            return res.status(200).json({message: "Delete was successfully"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Delete error'});
        }
    }
}