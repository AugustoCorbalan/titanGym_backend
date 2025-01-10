import {Activity} from '../../../../database/models/index.js';
import {User} from '../../../../database/models/index.js';

const getAllUsers = async (req, res)=>{
    try {
        const result = await User.findAll({
            include: {
                model: Activity,
                attributes: ['name', 'cost']
            }
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllUsers;