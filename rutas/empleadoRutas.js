import express from "express";
import { buscarUsuario, crearEmpleado, editarEmpleado, listarEmpleados, obtenerEmpleado, eliminarEmpleado } from "../controladores/empleadoController.js";
export const empleadoRutas = express.Router()
import { validateCreate } from '../validators/EmpleadosPaciente.js'


empleadoRutas.use(express.json())

empleadoRutas.get("/empleado/buscar", buscarUsuario)//busca usuario para ser asigando como empleado
empleadoRutas.post("/empleado/crear", crearEmpleado)
empleadoRutas.get("/empleado/listar", listarEmpleados)
empleadoRutas.get("/empleado/obtener", obtenerEmpleado)
empleadoRutas.post("/empledo/editar", validateCreate, editarEmpleado)
empleadoRutas.post("/empleado/eliminar", eliminarEmpleado)