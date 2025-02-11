import { User } from "../../../database/models/index.js";

export const verifyUserIsAdmin = async (userId)=>{
    try {
        const user = await User.findByPk(userId.id);
        console.log("userID userId", userId)
        return user.isAdmin;
    } catch (error) {
        console.log("Error en el servidor al buscar el usuaurio")
        return false;
    }
}