import { User } from "../../../database/models/index.js";

export const verifyUserIsAdmin = async (dataUser)=>{
    try {
        const user = await User.findByPk(dataUser.id);
        return user.isAdmin;
    } catch (error) {
        console.log("Error en el servidor al buscar el usuaurio")
        return false;
    }
}