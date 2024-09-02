import express from "express";
import { registerHandler, loginHandler } from '../controladores/usuarioController.js'
import pool from "../config/pg.js";
export const autenticacion = express.Router()//creando un enrutador

autenticacion.use(express.json())

autenticacion.post("/registrarse", registerHandler)

autenticacion.get('/', async (req, res) => {
    const result = await pool.query('select now()')
    return res.json(result.rows[0])
})
//inicio de sesion

autenticacion.post("/login", loginHandler)