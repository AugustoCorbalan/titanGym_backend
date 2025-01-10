import {User} from '../../../../database/models/index.js';

const postUser = async (req, res)=>{
    try {
        const data = req.body;
        const result = await User.create(data);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default postUser;