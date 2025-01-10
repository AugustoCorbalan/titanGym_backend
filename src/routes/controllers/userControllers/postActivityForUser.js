import {User} from "../../../../database/models/index.js";
import {Activity} from "../../../../database/models/index.js";

const postActivityForUser = async (req, res)=>{
    const {userId, activityName} = req.body;
    try {
        // Buscar el usuario
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error(`Usuario con ID ${userId} no encontrado.`);
        }
        // Buscar la actividad
        const activity = await Activity.findByPk(activityName);
        if (!activity) {
            throw new Error(`La actividad ${activityName} no fue encontrada.`);
        }
        // Asociar la actividad al usuario
        await user.addActivity(activity);
        res.status(200).send("Exito");
      } catch (error) {
        res.status(400).send(error.message);
      }
}

export default postActivityForUser;