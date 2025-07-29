import { User } from "../../../../database/models/index.js";

export const setTokenFCM = async(req, res)=>{
    try {
        const { userId, tokenFCM } = req.body;
        // Actualiza la propiedad isAdmin del usuario con el nombre dado
        const [affectedRows] = await User.update(
            { tokenFCM }, // El campo a actualizar
            { where: { googleId: userId } } // La condición para seleccionar el usuario
        );

        // Verifica si se actualizó algún registro
        if (affectedRows === 0) {
            throw new Error('Usuario no encontrado o no se actualizó ningún registro');
        }
        console.log("TokenFCM actualizado correctamente");
        res.status(200).send("TokenFCM actualizado correctamente");
    } catch (error) {
        console.log("Error al instancial el tokenFCM", error);
        res.status(400).send(error.message);
    }
}