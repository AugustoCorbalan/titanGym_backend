import User from '../../../../database/models/user.js';

const getUser = async (req, res)=>{
    try {
        const googleId = req.user.id;
        const result = await User.findByPk(googleId);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getUser;