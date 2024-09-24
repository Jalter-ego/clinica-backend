import express from "express";
import { crearPaciente, listarPaciente, obtenerPaciente, editarPaciente } from "../controladores/pacienteController.js";
import {buscarUsuario} from "../controladores/empleadoController.js";
import { validateCreate } from '../validators/EmpleadosPaciente.js'
export const pacienteRutas = express.Router()


pacienteRutas.use(express.json())

pacienteRutas.get("/paciente/buscar", buscarUsuario)//busca usuario para ser asigando como paciente
pacienteRutas.post("/paciente/crear", crearPaciente)
pacienteRutas.get("/paciente/listar", listarPaciente)
pacienteRutas.get("/paciente/obtener", obtenerPaciente)
pacienteRutas.post("/paciente/editar",validateCreate, editarPaciente)
