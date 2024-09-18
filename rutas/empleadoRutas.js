import express from "express";
import { buscarUsuario, crearEmpleado, editarEmpleado, listarEmpleados, obtenerEmpleado } from "../controladores/empleadoController.js";
export const empleadoRutas = express.Router()


empleadoRutas.use(express.json())

empleadoRutas.get("/empleado/buscar",buscarUsuario)//busca usuario para ser asigando como empleado
empleadoRutas.post("/empleado/crear",crearEmpleado)
empleadoRutas.get("/empleado/listar",listarEmpleados)
empleadoRutas.get("/empleado/obtener",obtenerEmpleado)
empleadoRutas.post("/empledo/editar",editarEmpleado)
