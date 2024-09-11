import express from "express";
import { crearRol, editarRol, eliminarRol, obtenerRoles } from "../controladores/rolController.js";
export const rolesRutas = express.Router()

rolesRutas.use(express.json())
//rutas
rolesRutas.post("/roles/crear", crearRol)
rolesRutas.delete("/roles/eliminar", eliminarRol)
rolesRutas.get("/roles/obtenerRoles", obtenerRoles)
rolesRutas.put("/roles/editar/:id", editarRol)