import express from "express";
import { crearPermiso, editarPermiso, eliminarPermiso, obtenerPermiso, obtenerPermisos } from "../controladores/permisoController.js";
export const permisosRutas = express.Router()

permisosRutas.use(express.json())

permisosRutas.post("/permisos/crear", crearPermiso)
permisosRutas.delete("/permisos/eliminar", eliminarPermiso)
permisosRutas.get("/permisos/listar", obtenerPermisos)
permisosRutas.get("/permisos/byUser", obtenerPermiso)
permisosRutas.put("/permisos/editar", editarPermiso)