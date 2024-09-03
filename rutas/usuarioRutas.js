import express from "express";
import pool from "../config/pg.js";
import { registerHandler, loginHandler, registerRol } from '../controladores/usuarioController.js'
export const autenticacion = express.Router()//creando un enrutador

autenticacion.use(express.json())

autenticacion.post("/registrarse", registerHandler)

autenticacion.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE ci = $1', ['127'])
    return res.json(result.rows[0])
})


//inicio de sesion
autenticacion.post("/login", loginHandler)
autenticacion.post("/registrarse/Rol", registerRol)