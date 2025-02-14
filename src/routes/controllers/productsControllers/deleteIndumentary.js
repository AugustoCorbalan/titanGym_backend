import { ProductIndumentary } from "../../../../database/models/index.js";
import { deleteImages } from "../../functionsAux/cloudinaryFunctions.js";
import { verifyUserIsAdmin } from "../../functionsAux/verifyUserIsAdmin.js";

const deleteIndumentary = async (req, res) => {
    try {
        const productId = req.query.productId;
        if(verifyUserIsAdmin(req.user)){
            // Buscar el producto por su ID
            const product = await ProductIndumentary.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
    
            // Si el producto tiene imágenes, eliminarlas de Cloudinary
            if (product.images && product.images.length > 0) {
                const deletedImages = await deleteImages(product.images);
                if (!deletedImages) {
                    return res.status(500).json({ message: "Error al eliminar imágenes de Cloudinary" });
                }
            }
    
            // Eliminar el producto de la base de datos
            await product.destroy();
    
            res.json({ message: "Producto eliminado con éxito" });
        }else{
            throw new error("El usuario no tiene los permisos necesarios");
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default deleteIndumentary;