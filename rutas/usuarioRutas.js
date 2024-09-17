import express from "express";
import pool from "../config/pg.js";
import { registerHandler, loginHandler, eliminarUsuario, obtenerUsuarios, obtenerUsuario, obtenerUsuarioToken } from '../controladores/usuarioController.js'
import { validateCreate } from '../validators/users.js'
import { validarToken } from "../services/middleware.js";
export const autenticacion = express.Router()//creando un enrutador


autenticacion.use(express.json())

autenticacion.post("/usuarios/registrarse", validateCreate, registerHandler)
autenticacion.post("/usuarios/login", loginHandler)
autenticacion.delete("/usuarios/eliminar", eliminarUsuario)
autenticacion.get("/usuarios/obtenerUsuarios", obtenerUsuarios)
autenticacion.get("/usuarios/obtenerUsuario", obtenerUsuario)
autenticacion.get("/usuarios/obtenerUsuarioToken", validarToken, obtenerUsuarioToken)

autenticacion.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE ci = $1', ['127'])
    return res.json(result.rows[0])
})
