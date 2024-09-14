import express from "express";
import { crearProfesiones, editarProfesiones, listarProfesiones, eliminarProfesiones } from "../controladores/profesionesController.js";
export const profesionRutas = express.Router()
import {validateCreate} from '../validators/profesiones.js'


profesionRutas.use(express.json())

profesionRutas.post("/profesiones/crear",validateCreate, crearProfesiones)
profesionRutas.post("/profesiones/editar",validateCreate, editarProfesiones)
profesionRutas.get("/profesiones", listarProfesiones);
profesionRutas.delete("/profesiones/eliminar", eliminarProfesiones);
