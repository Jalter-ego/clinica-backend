//backend/index.js
import express from 'express';
import connectDB from './config/mongodb.js';
import pool from './config/pg.js'
import { autenticacion } from './rutas/UsuarioRutas.js';

import dotenv from 'dotenv';
dotenv.config();

connectDB(); // Conectar a la base de datos

const app = express();
app.use(express.json());

app.use(autenticacion);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
