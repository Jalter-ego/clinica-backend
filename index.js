//backend/index.js
import express from 'express';
import { autenticacion } from './rutas/usuarioRutas.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use(autenticacion);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});
