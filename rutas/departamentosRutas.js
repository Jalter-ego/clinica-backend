import express from 'express'
import {
    crearDepartamento, editarDepartamento,
    eliminarDepartamento, listarDepartamentos
} from '../controladores/departamentosController.js'
export const departamentoRutas = express.Router()

departamentoRutas.use(express.json())

departamentoRutas.post("/departamentos/crear", crearDepartamento)
departamentoRutas.put("/departamentos/editar", editarDepartamento)
departamentoRutas.delete("/departamentos/eliminar", eliminarDepartamento)
departamentoRutas.get("/departamentos/listar", listarDepartamentos)