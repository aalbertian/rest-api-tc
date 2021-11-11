import Type from '../models/Type';

export class TypeController {
    async get(req, res) {
        try {
            const types = await Type.find({}).select('name slug -_id')
            return res.status(200).json(types)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    }

}