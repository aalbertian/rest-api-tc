import Claims from "../models/Claim";
import Users from "../models/User";
import {Roles} from "../models";
import {WORK, ADMIN} from "../types/roles";

export class ClaimController {
    async create(req, res) {
        try {
            const {title, description, type, status = "NEW"} = req.body;
            const user_id = req.user.id;
            const user = await Users.findOne({_id: user_id})
            const claim = new Claims({title, description, type, status, user: user._id});
            await claim.save();
            return res.status(200).json(claim);
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Create error'});
        }
    };
    async update(req, res) {
        try {
            const user = req.user;
            const _id = req.params.id
            const {title, description, type, status} = req.body
            const role = await Roles.findOne({_id: user.role});
            const {slug} = role;
            const claim = await Claims.findOneAndUpdate(
                {_id},
                { $set: slug === ADMIN ? { title, description, type, status } : { title, description, type}},
                { upsert: true, new: true });
            return res.status(200).json(claim)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update error'});
        }
    };
    async getAll(req, res) {
        try {
            const {offset = 0, limit} = req.query;
            const user = req.user;
            let response = {
                totalItems: null,
                claims: null
            };
            const role = await Roles.findOne({_id: user.role});
            const {slug} = role;
            if (slug === WORK) {
                response.claims = limit ?
                await Claims.find(
                {'user' : user.id })
                .limit(Number(limit))
                .skip(Number(offset)) :
                await Claims.find({'user' : user.id })
                response.totalItems = await Claims.find({'user' : user.id }).count();
            }
            if (slug === ADMIN) {
                response.claims = limit ?
                await Claims.find({})
                .limit(Number(limit))
                .skip(Number(offset)) :
                await Claims.find({})
                response.totalItems = await Claims.count();
            }
            return res.status(200).json(response)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    };
    async getById(req, res) {
        try {
            const _id = req.params.id
            const claim = await Claims.findOne({_id});
            return res.status(200).json(claim)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    };
    async delete(req, res) {
        try {
            const _id = req.params.id
            const claim = await Claims.findOneAndRemove({_id})
            return res.json({message: "Delete was successfully", claim})
        } catch (e) {
            console.log(e)
        }
    }
}