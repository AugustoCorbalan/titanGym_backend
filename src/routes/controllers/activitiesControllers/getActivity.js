import {Activity} from '../../../../database/models/index.js';

const getActivity = async (req, res)=>{
    try {
        const activityName = req.activityName;
        const result = await Activity.findByPk(activityName);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getActivity;