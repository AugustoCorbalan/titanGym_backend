import { Membership, User } from "../../../../database/models/index.js";
import { verifyUserIsAdmin } from "../../functionsAux/verifyUserIsAdmin.js";

const deleteMemberships = async (req, res) => {
    const user = req.user;
    const { membershipsIds } = req.body;
    try {
        for (const membershipId of membershipsIds) {
            const membership = await Membership.findByPk(membershipId);
            if (!membership) {
                return res.status(404).json({ error: `Membresía con ID ${membershipId} no encontrada` });
            }

            const isAdmin = await verifyUserIsAdmin(user);
            if (isAdmin || membership.userId === user.id) {
                const user = await User.findByPk(membership.userId);
                if (user) {
                    await user.removeActivity(membership.activityId); // Elimino la relación entre usuario y actividad
                }
                await membership.destroy(); // Elimino la membresía
            } else {
                return res.status(403).json({ error: "El usuario solicitante no tiene los permisos necesarios" });
            }
        }

        res.status(200).json({ message: "Membresías eliminadas con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default deleteMemberships;