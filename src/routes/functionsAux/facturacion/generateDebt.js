import {sequelize, Debt} from "../../../../database/models/index.js";
import debtCalculator from "./debtCalculatorDates.js";

export const generateDebt = async(userId)=>{

    const t = await sequelize.transaction(); // Iniciar una transacción
    try {
        //Creo la deuda (Factura);
        const debtDate = await debtCalculator(userId, t); //Calcula el monto a pagar, día de pago;
        if (!debtDate) throw new Error("Error al calcular la deuda.");
        //Verifico que la factura no este ya generada;
        const previusCreated = await Debt.findOne({
          where: {
            issueDate: debtDate.issueDate,
          }
        });
        if(previusCreated){
          throw new Error("La deuda ya estaba creada!");
        }
        await Debt.create(debtDate, {transaction: t});
        await t.commit(); // Confirmar la transacción
      } catch (error) {
        await t.rollback(); // Deshacer cambios si hubo un error
        console.log("Error al generar nuevas facturas:");
        console.log(error);
      }

}