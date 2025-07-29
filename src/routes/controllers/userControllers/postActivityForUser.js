import {sequelize, User, Activity, Membership, Debt} from "../../../../database/models/index.js";
import getDateNextMonth from "../../functionsAux/facturacion/auxiliares/getDateNextMonth.js";
import debtCalculator from "../../functionsAux/facturacion/debtCalculatorDates.js";

const postActivityForUser = async (req, res)=>{
    const {userId, activityId} = req.body;
    const t = await sequelize.transaction(); // Iniciar una transacción
    try {
        // Buscar el usuario
        const user = await User.findByPk(userId, {
          include: Activity,
          transaction: t
        });
        if (!user) {
            throw new Error(`Usuario con ID ${userId} no encontrado.`);
        }
        // Verifico si la actividad ya esta asociada al usuario
        const exists = user.Activities.some((activity) => activity.id == activityId);
        if (exists) {  //En caso que ya este asociada, genero dicho errror.
          throw new Error('La actividad ya esta asociada al usuario');
        }
        // Buscar la actividad
        const activity = await Activity.findByPk(activityId, {transaction: t});
        if (!activity) {
            throw new Error(`La actividad ${activityId} no fue encontrada.`);
        }
        await 
        // Asociar la actividad al usuario
        await user.addActivity(activity, {transaction: t});
        // Verifico si el usuario tiene membresías previas.-------------------------
        const prevMemberships = await Membership.findAll({
          where: {
            userId: userId
          }
        })
        if(prevMemberships.length>0){
          // Seteo el mismo periodo y el mismo dia de pago que la membresía anterior.
          // Y NO genero la factura (Debt) para este mes (Se arregla presencialmente el periodo corriente);
          await Membership.create({
            userId, 
            activityId: activity.id,
            payDay: prevMemberships[0].payDay,
            startDate: prevMemberships[0].startDate
          }, {transaction: t});

        }else{
          //Asocio una membresía al usuario, con la nueva Actividad
          const today = new Date();
          // Obtener el día del mes
          const numberToday = today.getDate();
          await Membership.create({
            userId, 
            activityId: activity.id,
            payDay: numberToday,
            startDate: today
          }, {transaction: t});
          //Creo la primera deuda (Factura);
          const debtDate = await debtCalculator(userId, t); //Calcula el monto a pagar, día de pago;
          if (!debtDate) throw new Error("Error al calcular la deuda.");
          await Debt.create(debtDate, {transaction: t});
        }
        await t.commit(); // Confirmar la transacción
        res.status(200).send("Exito");
      } catch (error) {
        await t.rollback(); // Deshacer cambios si hubo un error
        console.log(error);
        res.status(400).send(error.message);
      }
}

export default postActivityForUser;