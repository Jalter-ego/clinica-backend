//rutas/rolRutas.js
import express from "express";
import { crearRol, editarRol, eliminarRol, obtenerRoles } from "../controladores/rolController.js";
import { validarToken, verificarPermiso } from "../services/middleware.js";
export const rolesRutas = express.Router();

rolesRutas.use(express.json());

rolesRutas.post("/roles/crear", validarToken, verificarPermiso('crear_rol'), crearRol);
rolesRutas.delete("/roles/eliminar", validarToken, verificarPermiso('eliminar_rol'), eliminarRol);
rolesRutas.get("/roles/obtenerRoles", validarToken, obtenerRoles);
rolesRutas.put("/roles/editar/:id", validarToken, verificarPermiso('editar_rol'), editarRol);
