import { RepositorioProfesiones } from "../services/profesionesServices.js";
import pool from '../config/pg.js'


export const crearProfesiones = async (req, res) => {
    try {
        const { nombre } = req.body
        const result = await RepositorioProfesiones.crear({ nombre })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.profesion)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const editarProfesiones = async (req, res) => {
    try {
        const { id, nombre } = req.body;
        const result = await RepositorioProfesiones.editar({ id, nombre });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.profesion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


    
};

export const listarProfesiones = async (req, res) => {
    try {
        const result = await RepositorioProfesiones.listar();

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.profesiones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const eliminarProfesiones = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await RepositorioProfesiones.eliminar({ id });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json({ msg: result.msg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

