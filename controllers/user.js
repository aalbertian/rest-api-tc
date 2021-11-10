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
                return res.json({message: "A user with this username already exists", code: 1});
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const userRole = await Roles.findOne({slug: role});
            if (!userRole) {
                return res.json({message: "A role doesn't exists", code: 1});
            }
            const user = new Users({fullName, email, password: hashPassword, role: userRole._id});
            await user.save();
            return res.status(200).json({role: role, user_id: user.id, fullName: user.fullName, email: user.email});
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
            const rl = await Roles.findOne({slug: role});
            const user = await Users.findOneAndUpdate(
                {_id},
                { $set:{ fullName, email, password: hashPassword, role: rl._id }},
                { upsert: true, new: true }
            )
            return res.status(200).json(user)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update error'});
        }
    }
    async getAll(req, res) {
        try {
            const {offset = 0, limit} = req.query;

            let response = {
                totalItems: null,
                users: null
            };

            response.users = limit ?
                await Users.find({})
                    .limit(Number(limit))
                    .skip(Number(offset)) :
                await Users.find({})
            response.totalItems = await Users.count();

            return res.json(response)
        } catch (e) {
            console.log(e)
        }
    }
    async getById(req, res) {
        try {
            const _id = req.params.id
            const user = await Users.findOne({_id})
            return res.json(user)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const _id = req.params.id
            const user = await Users.findOneAndRemove({_id})
            return res.json({message: "Delete was successfully", user})
        } catch (e) {
            console.log(e)
        }
    }
}