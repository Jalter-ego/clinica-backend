//backend/rutas/usuarioRutas.js
import express from "express";
import { registerHandler, loginHandler } from '../controladores/usuarioController.js'
export const autenticacion = express.Router()//creando un enrutador

autenticacion.use(express.json())

autenticacion.post("/registrarse", registerHandler)

//inicio de sesion

autenticacion.post("/api/login", loginHandler)
