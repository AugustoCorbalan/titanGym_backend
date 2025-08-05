import { User } from "../../../../database/models/index.js";
import { sequelize } from "../../../../database/models/index.js";
import { loadImage, deleteImages } from "../../functionsAux/cloudinaryFunctions.js";

export const putUser = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const data = JSON.parse(req.body.data); // Datos: name, lastName, birthday
    const userId = data.userId; // Se asume que req.user fue seteado por auth middleware
    console.log(req.body.data);
    console.log("userId", userId);
    let user = await User.findOne({
      where: { googleId: userId },
      transaction: t
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Imagen antigua
    const oldImage = user.picture;

    // Si hay nueva imagen
    let newImageUrl = oldImage; // por defecto queda la misma

    if (req.file) {
      const uploadedImages = await loadImage([req.file]); // retorna array con una sola url
      if (!uploadedImages || uploadedImages.length === 0) {
        throw new Error("Error al cargar la nueva imagen");
      }
      newImageUrl = uploadedImages[0]; // nueva URL

      // Borro la imagen vieja de Cloudinary si existe
      if (oldImage) {
        const deleted = await deleteImages([oldImage]);
        if (!deleted) {
          throw new Error("Error al eliminar la imagen anterior de Cloudinary");
        }
      }
    }

    // Actualizo los datos
    const updatedData = {
      ...data,
      picture: newImageUrl
    };

    await user.update(updatedData, { transaction: t });

    await t.commit();
    res.send("Usuario actualizado correctamente");
  } catch (error) {
    await t.rollback();
    console.error("Error actualizando usuario:", error);
    res.status(400).send(error.message);
  }
};

export default putUser;
