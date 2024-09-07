//backend/index.js
import express from 'express';
import { autenticacion } from './rutas/usuarioRutas.js';
import { rolesRutas } from './rutas/rolRutas.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Permitir solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o credenciales
}));

app.use(express.json());

app.use(autenticacion)
app.use(rolesRutas)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});
