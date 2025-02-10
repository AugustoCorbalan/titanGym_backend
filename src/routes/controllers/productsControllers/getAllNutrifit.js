import {NutrifitType, ProductNutrifit} from '../../../../database/models/index.js';

const getAllNutrifit = async (req, res)=>{
    try {
        const result = await ProductNutrifit.findAll({
            include: {
                model: NutrifitType,
                as: 'productType'
            }
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllNutrifit;