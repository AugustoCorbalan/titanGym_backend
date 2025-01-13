import {User, Membership, Activity} from '../../../../database/models/index.js';
import getDateNextMonth from './auxiliares/getDateNextMonth.js';

const debtCalculator = (userId)=>{
    const user = User.findByPk(userId,{
        include: Membership
    });
    let debt = 0;
    let description = "";
    const memberships = user.memberships;
    if (memberships.length == 0){
        debt = 0;
    }else if (memberships.length == 1){
        const amount = Activity.findByPk(memberships[0].id).cost;
        debt = amount;
    }else if (memberships.length == 2){
        const membership1 = Activity.findByPk(memberships[0].id);
        const membership2 = Activity.findByPk(memberships[1].id);
        //Aplicamos un 50% de descuento en la actividad mas barata.
        const cost1 = (membership1.name == 'Funcional') ? (membership1.cost/2) : membership1.cost;
        const cost2 = (membership2.name == 'Funcional') ? (membership1.cost/2) : membership1.cost;
        debt = (cost1<cost2)? (cost1/2)+cost2 : cost1+(cost2/2);
        description = "Se realizó un descuento del 50% en la 2da actividad"
    }
    const today = new Date();
    const dueDay = getDateNextMonth(today);
    return {
        amount: debt,
        dueDay,
        description
    };
}

export default debtCalculator;