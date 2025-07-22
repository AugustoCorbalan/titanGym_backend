import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();
export const verifyNotification = (req)=>{
    const {SECRET_KEY_MP} = process.env;
    // Obtener el valor de x-signature del encabezado
    const xSignature = req.headers['x-signature']; // Suponiendo que headers es un objeto que contiene los encabezados de la solicitud
    const xRequestId = req.headers['x-request-id']; // Suponiendo que headers es un objeto que contiene los encabezados de la solicitud
    
    // Obtener los parámetros de consulta relacionados con la URL de la solicitud
    const dataID = req.query['data.id'];
    
    // Separar x-signature en partes
    const parts = xSignature.split(',');
    
    // Inicializar variables para almacenar ts y hash
    let ts;
    let hash;
    
    // Iterar sobre los valores para obtener ts y v1
    parts.forEach(part => {
        // Dividir cada parte en clave y valor
        const [key, value] = part.split('=');
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === 'ts') {
                ts = trimmedValue;
            } else if (trimmedKey === 'v1') {
                hash = trimmedValue;
            }
        }
    });
    
    // Obtener la clave secreta para el usuario/aplicación del sitio de desarrolladores de Mercadopago
    const secret = SECRET_KEY_MP;
    
    // Generar la cadena de manifiesto
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
    
    // Crear una firma HMAC
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);
    
    // Obtener el resultado del hash como una cadena hexadecimal
    const sha = hmac.digest('hex');
    
    return (sha === hash);

}