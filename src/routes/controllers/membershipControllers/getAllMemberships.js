import {Membership} from '../../../../database/models/index.js';

const getAllMemberships = async (req, res)=>{
    try {
        const result = await Membership.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllMemberships;