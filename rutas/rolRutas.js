import express from "express";
import { crearRol, eliminarRol } from "../controladores/rolController.js";
export const rolesRutas = express.Router()

rolesRutas.use(express.json())
//rutas
rolesRutas.post("/roles/crear", crearRol)
rolesRutas.post("/roles/eliminar", eliminarRol)