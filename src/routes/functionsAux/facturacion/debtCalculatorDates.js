import {User, Membership, Activity} from '../../../../database/models/index.js';
import getDateNextMonth from './auxiliares/getDateNextMonth.js';

const debtCalculatorDates = async (userId, transaction)=>{
    const user = await User.findByPk(userId,{
        include: Membership,
        transaction
    });

    console.log("Ussseeer", user);
    let debt = 0;
    let description = "";
    let products = [];
    const memberships = user.Memberships;
    if (memberships.length == 0){ // Si no hay membresías, la deuda es 0;
        debt = 0;
    }else if (memberships.length == 1){ // Si tiene una sola membresía, la deuda es el valor de la membresía;
        const {cost, name} = await Activity.findByPk(memberships[0].activityId);
        debt = cost;
        products.push(name);
    }else if (memberships.length == 2){ // Si tiene 2 membresías se aplica un 50% de descuento en la membresía de menor valor;
        const activity1 = await Activity.findByPk(memberships[0].activityId);
        const activity2 = await Activity.findByPk(memberships[1].activityId);
        const cost1 = activity1.cost;
        const cost2 = activity2.cost;
        products.push(activity1.name);
        products.push(activity2.name);
        //Aplicamos un 50% de descuento en la actividad mas barata.
        debt = (cost1<cost2)? (cost1/2)+cost2 : cost1+(cost2/2);
        description = "Se realizó un descuento del 50% en la 2da actividad" //Informamos en la descripción del descuento;
    }
    const today = new Date();
    const dueDate = new Date();
    const endDate = getDateNextMonth(today); // Fecha de fin del periodo facturado;
    dueDate.setDate(endDate.getDate() + 15); // Fecha de vencimiento de la deuda (15 días despues de terminado el periodo facturado);
    return {
        userId,
        amount: debt,
        dueDate, //Fecha de vencimiento de la deuda
        issueDate: today, //Fecha de emisión de la deuda
        startDate: today, //Fecha de inicio del periodo facturado
        endDate, //Fecha de fin del periodo facturado
        products,
        description
    };
}

export default debtCalculatorDates;