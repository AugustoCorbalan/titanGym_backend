import {ProductIndumentary, IndumentaryType, NutrifitType, ProductNutrifit} from '../../../../database/models/index.js';

const getAllProducts = async (req, res)=>{
    try {
        const resultIndumentary = await ProductIndumentary.findAll({
            include: {
                model: IndumentaryType
            }
        });
        const resultNutrifit = await ProductNutrifit.findAll({
            include: {
                model: NutrifitType
            }
        });
        const result = resultIndumentary.concat(resultNutrifit);
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllProducts;