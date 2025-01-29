import {Debt} from '../../../../database/models/index.js';


const getAllDebts = async (req, res)=>{
    try {
        const result = await Debt.findAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default getAllDebts;