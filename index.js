//backend/index.js
import express from 'express';
import { autenticacion } from './rutas/usuarioRutas.js';
import { rolesRutas } from './rutas/rolRutas.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { permisosRutas } from './rutas/permisosRutas.js';
import { profesionRutas } from './rutas/profesionesRutas.js';
dotenv.config();

const app = express();
const whitelist = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
    'http://localhost:5176', 'http://localhost:5177'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(autenticacion)
app.use(rolesRutas)
app.use(permisosRutas)
app.use(profesionRutas)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});
