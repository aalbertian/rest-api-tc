import Status from '../models/Status';

export class StatusController {
    async get(req, res) {
        try {
            const status = await Status.find({}).select('name slug -_id')
            return res.status(200).json(status)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get error'});
        }
    }

}