import {Activity} from '../../../../database/models/index.js';


const getAllActivities = async (req, res)=>{
    try {
        const result = await Activity.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllActivities;