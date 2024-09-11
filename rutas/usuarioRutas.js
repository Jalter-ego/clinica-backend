import express from "express";
import pool from "../config/pg.js";
import { registerHandler, loginHandler, eliminarUsuario } from '../controladores/usuarioController.js'
import {validateCreate} from '../validators/users.js'
export const autenticacion = express.Router()//creando un enrutador


autenticacion.use(express.json())

autenticacion.post("/usuarios/registrarse",validateCreate, registerHandler)
autenticacion.post("/usuarios/login", loginHandler)
autenticacion.post("/usuarios/eliminar", eliminarUsuario)

autenticacion.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE ci = $1', ['127'])
    return res.json(result.rows[0])
})
