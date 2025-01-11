import {Membership} from '../../../../database/models/index.js';

const postMembership = async (req, res)=>{
    try {
        const data = req.body;
        const result = await Membership.create(data);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default postMembership;