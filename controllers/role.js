import Role from '../models/Role';

export class RoleController {
    async get(req, res) {
        try {
            const status = await Role.find({}).select('name slug -_id')
            return res.status(200).json(status)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    }

}