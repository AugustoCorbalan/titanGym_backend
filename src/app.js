import express from 'express';
import routes from './routes/index.js';
import passport from './passport.js';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const app = express();

//Configuración de Passport
app.use(passport.initialize());

//Configuracion de CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    credentials: true, // Permitir cookies
  };
//Creo manualmente __filename y __dirname ya que en proyectos {type: module} no funcionan por defecto. 

// Obtener __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Configuración multer:
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb)=>{
      cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase()); //Genero un id aleatorio y lo concateno con la extensión del archivo.
  }
});
const fileFilter = (req, file, cb)=>{
  const filetypes = /jpeg|jpg|png|svg/; //Expresión regular que valida que contenga alguna de estas extensiones.
  const mimetype = filetypes.test(file.mimetype); // Valido que la propiedad mimetype del objeto file (Que es la extension del archivo), sea un tipo de archivo valido.
  const extname = filetypes.test(path.extname(file.originalname)) //Verifico que la extensión del archivo sea un tipo de archivo permitido.
  if(mimetype && extname){
      return cb(null, true) // en el caso que ambas cosas se cumplan, no retorno error (null),y envió "true".
  }
  cb("Error el archivo debe ser en formato (jpeg, jpg, png ó svg"); //En caso que no se cumplan las condiciones, retorno un error.
}
//Mildwares 
app.use(cors(corsOptions));

app.use(multer({
  storage: storage,
  dest: path.join(__dirname, 'public/uploads'),
  limits: { fileSize: 5000000},
  fileFilter: fileFilter
}).array('image', 6));

app.use(express.json());
app.use(routes);

export default app;