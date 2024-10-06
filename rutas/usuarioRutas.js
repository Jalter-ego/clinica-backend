import express from "express";
import pool from "../config/pg.js";
import {
    registerHandler, loginHandler, eliminarUsuario, obtenerUsuarios, obtenerUsuario,
    obtenerUsuarioToken, editUsuario, editUserName
} from '../controladores/usuarioController.js'
import { validateCreate } from '../validators/users.js'
import { validarToken } from "../services/middleware.js";
export const usuarioRutas = express.Router()//creando un enrutador

usuarioRutas.use(express.json())

usuarioRutas.post("/usuarios/registrarse", validateCreate, registerHandler)
usuarioRutas.post("/usuarios/login", loginHandler)
usuarioRutas.delete("/usuarios/eliminar", eliminarUsuario)
usuarioRutas.put("/usuarios/editarUsuario", editUsuario)
usuarioRutas.get("/usuarios/obtenerUsuarios", obtenerUsuarios)
usuarioRutas.get("/usuarios/obtenerUsuario", obtenerUsuario)
usuarioRutas.get("/usuarios/obtenerUsuarioToken", validarToken, obtenerUsuarioToken)

usuarioRutas.put("/usuarios/editUserName", editUserName)
//usuarioRutas.put("/usuarios/editUserEmail",editUserEmail)
