//rutas/rolRutas.js
import express from "express";
import { agregarPermisos, crearRol, editarRol, eliminarRol, getRolesPermisos, obtenerRoles, rolByUser } from "../controladores/rolController.js";
import { validarToken, verificarPermiso } from "../services/middleware.js";
export const rolesRutas = express.Router();

rolesRutas.use(express.json());

rolesRutas.post("/roles/crear", crearRol);
rolesRutas.delete("/roles/eliminar", eliminarRol);
rolesRutas.get("/roles/obtenerRoles", obtenerRoles);
rolesRutas.get("/roles/obtenerRol", rolByUser)
rolesRutas.put("/roles/editar", editarRol);

rolesRutas.post("/roles/agregar-permisos", agregarPermisos);
rolesRutas.get("/roles/permisos", getRolesPermisos);
