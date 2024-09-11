import express from "express";
import { crearPermiso } from "../controladores/permisoController.js";
export const permisosRutas = express.Router()

permisosRutas.use(express.json())

permisosRutas.post("/permisos/crear", crearPermiso)
//permisosRutas.delete("/permisos/eliminar", eliminarPermiso)
//permisosRutas.get("/permisos/obtener", obtenerPermisos)