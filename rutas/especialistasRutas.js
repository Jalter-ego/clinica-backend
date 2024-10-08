import express from "express";
import { crearEspecialista, editarEspecialista, listarEspecialistas, eliminarEspecialista } from "../controladores/especialistasController.js";
export const especialistasRutas = express.Router()


especialistasRutas.use(express.json())

especialistasRutas.post("/especialistas/crear", crearEspecialista)
especialistasRutas.post("/especialistas/editar", editarEspecialista)
especialistasRutas.get("/especialistas/listar", listarEspecialistas);
especialistasRutas.delete("/especialistas/eliminar", eliminarEspecialista);