import User from '../../../../database/models/user.js';

const getAllUsers = async (req, res)=>{
    try {
        const result = await User.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllUsers;