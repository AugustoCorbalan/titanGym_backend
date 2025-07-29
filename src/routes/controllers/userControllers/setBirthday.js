import { User } from "../../../../database/models/index.js";

export const setBirthday = async(req, res)=>{
    try {
        const { userId, birthday } = req.body;
        //Genero la fecha con la zona horaria correcta.
        const [year, month, day] = birthday.split('-');
        const normalizedDate = new Date(year, month - 1, day); 
        
        // Actualiza la propiedad birthday del usuario con el nombre dado
        const [affectedRows] = await User.update(
            { birthday: normalizedDate }, // El campo a actualizar
            { where: { googleId: userId } } // La condición para seleccionar el usuario
        );

        // Verifica si se actualizó algún registro
        if (affectedRows === 0) {
            throw new Error('Usuario no encontrado o no se actualizó ningún registro');
        }
        console.log("Birthday actualizado correctamente");
        res.status(200).send("Birthday actualizado correctamente");
    } catch (error) {
        console.log("Error al instancial el Birthday del usuario", error);
        res.status(400).send(error.message);
    }
}