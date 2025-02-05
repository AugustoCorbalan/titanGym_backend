import { User } from "../../../../database/models/index.js";
import dotenv from 'dotenv';

dotenv.config();

const setUserAsAdmin = async (req, res)=>{
    const userId = req.body.userId;
    const password = req.body.password;
    const {PASSWORD_SET_USERASADMIN} = process.env;
    try {
        if(password != PASSWORD_SET_USERASADMIN){
            res.status(403).send("No se permite esta acción");
        }
     
        // Actualiza la propiedad isAdmin del usuario con el nombre dado
        const [affectedRows] = await User.update(
            { isAdmin: true }, // El campo a actualizar
            { where: { googleId: userId } } // La condición para seleccionar el usuario
        );

        // Verifica si se actualizó algún registro
        if (affectedRows === 0) {
            throw new Error('Usuario no encontrado o no se actualizó ningún registro');
        }

        res.status(200).send("El usuario ahora es administrador");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export default setUserAsAdmin;