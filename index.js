//backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { usuarioRutas } from './rutas/usuarioRutas.js';
import { rolesRutas } from './rutas/rolRutas.js';
import { especialidadRutas } from './rutas/especialidadesRutas.js';
import { empleadoRutas } from './rutas/empleadoRutas.js';
import { permisosRutas } from './rutas/permisosRutas.js';
import { profesionRutas } from './rutas/profesionesRutas.js';
import { pacienteRutas } from './rutas/pacienteRutas.js';
import { especialistasRutas } from './rutas/especialistasRutas.js';
import { departamentoRutas } from './rutas/departamentosRutas.js';

dotenv.config();

const app = express();

const whitelist = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'https://clinicacoftalmologica.netlify.app'
];

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

// Rutas
app.use(usuarioRutas);
app.use(rolesRutas);
app.use(permisosRutas);
app.use(profesionRutas);
app.use(especialidadRutas);
app.use(empleadoRutas);
app.use(pacienteRutas);
app.use(especialistasRutas);
app.use(departamentoRutas);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});

