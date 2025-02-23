import { Membership } from '../../../../database/models/index.js';
import { verifyUserIsAdmin } from '../../functionsAux/verifyUserIsAdmin.js'

const getMembershipsUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "Falta el parámetro userId" });
  }
  if (verifyUserIsAdmin(req.user) || req.user.googleId === userId) {
    try {
      const memberships = await Membership.findAll({
        where: {userId},
        raw: true // Devuelve un JSON con la información de la membresía
      });
      if(memberships){
        res.status(200).json(memberships);
      }else{
        res.status(404).json({ message: "No se encontraron membresías para el usuario" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  else {
    res.status(403).json({ message: "No tienes permisos para acceder a esta información" });
  }
}	

export default getMembershipsUser;