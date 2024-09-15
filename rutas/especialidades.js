import express from "express";
import { crearEspecialidades, editarEspecialides, listarEspecialidades, eliminarEspecialidades } from "../controladores/especialidadesController.js";
export const especialidadRutas = express.Router()
import {validateCreate} from '../validators/especialidades.js'


especialidadRutas.use(express.json())

especialidadRutas.post("/especialidades/crear",validateCreate, crearEspecialidades)
especialidadRutas.post("/especialidades/editar",validateCreate, editarEspecialides)
especialidadRutas.get("/especialidades", listarEspecialidades);
especialidadRutas.delete("/especialidades/eliminar", eliminarEspecialidades);