import {ProductIndumentary, IndumentaryType} from '../../../../database/models/index.js';

const getAllIndumentary = async (req, res)=>{
    try {
        const result = await ProductIndumentary.findAll({
            include: {
                model: IndumentaryType
            }
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllIndumentary;