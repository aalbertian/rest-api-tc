import Claims from "../models/Claim";
import Users from "../models/User";
import Roles from "../models/Role";
import Type from "../models/Type";
import Status from "../models/Status";
import {WORK, ADMIN} from "../types/roles";

export class ClaimController {
    async create(req, res) {
        try {
            const {title, description, type, status} = req.body;
            const user_id = req.user.id;
            const user = await Users.findOne({_id: user_id})
            const role = await Roles.findOne({_id: user.role})
            const {slug} = role;
            const tp = await Type.findOne({slug: type})
            const st = await Status.findOne({slug: slug === ADMIN ? status : 'new'})
            const claim = new Claims({title, description, type: tp, status: st, user: user._id})
            await claim.save();
            const {_doc} = claim
            return res.status(200).json({..._doc, type: {name: tp.name, slug: tp.slug}, status: {name: st.name, slug: st.slug}});
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
            const role = await Roles.findOne({_id: user.role})
            const {slug} = role;
            const tp = await Type.findOne({slug: type})
            const st = await Status.findOne({slug: status })
            const claim = await Claims.findOneAndUpdate(
                {_id},
                { $set: slug === ADMIN ?
                        { title, description, type: tp, status: st } :
                        { title, description, type: tp}},
                { upsert: true, new: true })
                .populate({path:'type', select:'name slug -_id'})
                .populate({path:'status', select:'name slug -_id'})
            return res.status(200).json(claim)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Update error'});
        }
    };
    async getAll(req, res) {
        try {
            const {offset = 0, limit, search, column, sort} = req.query;
            const user = req.user;
            let response = {
                totalItems: null,
                claims: null
            };
            const searching = search ? {$text: {$search: search}} : {}
            const sorting = column && sort ? {[column]: sort} : {}
            const role = await Roles.findOne({_id: user.role}).select('name slug -_id');
            const {slug} = role;
            if (slug === WORK) {
                response.claims = limit ?
                await Claims.find(
                {'user' : user.id, ...searching})
                    .populate({path : 'status', select:'name slug -_id'})
                    .populate({path: 'type', select:'name slug -_id'})
                    .sort(sorting)
                .limit(Number(limit))
                .skip(Number(offset)) :
                await Claims.find({'user' : user.id, ...searching})
                    .populate({path : 'status', select:'name slug -_id'})
                    .populate({path: 'type', select:'name slug -_id'})
                    .sort(sorting)
                response.totalItems = await Claims.find({'user' : user.id, ...searching}).count();
            }
            if (slug === ADMIN) {
                response.claims = limit ?
                await Claims.find(searching)
                    .populate({path : 'status', select:'name slug -_id'})
                    .populate({path: 'type', select:'name slug -_id'})
                    .sort(sorting)
                .limit(Number(limit))
                .skip(Number(offset)) :
                await Claims.find(searching)
                    .populate({path : 'status', select:'name slug -_id'})
                    .populate({path: 'type', select:'name slug -_id'})
                    .sort(sorting)
                response.totalItems = await Claims.find(searching).count();
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
            const claim = await Claims.findOne({_id})
                .populate({path : 'status', select:'name slug -_id'})
                .populate({path: 'type', select:'name slug -_id'})
            return res.status(200).json(claim)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    };
    async delete(req, res) {
        try {
            const _id = req.params.id
            await Claims.findOneAndRemove({_id})
            return res.json({message: "Delete was successfully"})
        } catch (e) {
            console.log(e)
        }
    }
}