import { User } from "../../../database/models/index";

export const verifyUserIsAdmin = async (userId)=>{
    try {
        const user = await User.findByPk(userId);
        return user.isAdmin;
    } catch (error) {
        console.log("Error en el servidor al buscar el usuaurio")
        return error;
    }
}