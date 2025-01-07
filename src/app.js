import express from 'express';
import routes from './routes/index.js';
import passport from './passport.js';
import cors from 'cors';

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
  
//Mildwares 
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

export default app;