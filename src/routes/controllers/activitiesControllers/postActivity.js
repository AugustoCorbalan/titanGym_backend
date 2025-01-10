import {Activity} from '../../../../database/models/index.js';

const postActivity = async (req, res)=>{
    try {
        const data = req.body;
        const result = await Activity.create(data);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default postActivity;