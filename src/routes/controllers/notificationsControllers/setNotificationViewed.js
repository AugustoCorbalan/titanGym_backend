import {UserNotification} from "../../../../database/models/index.js";

const setNotificationViewed = async (req, res)=>{
    const googleId = req.user.id;
    const {notificationId} = req.body;
    
    try {
        await UserNotification.update(
            { viewed: true},
            {where: {googleId, notificationId}}
        )
        console.log("Notificación marcada como leída")
        res.status(200).send("Estado de notificación actualizado con éxito")
    } catch (error) {
        console.log(error);
        console.log("Error al marcar notificación como leída");
        res.status(400).send(error.message);
    }
} 

export default setNotificationViewed;