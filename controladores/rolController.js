import { RepositorioRol } from "../services/rolesServices.js";
import pool from '../config/pg.js'

export const crearRol = async (req, res) => {
    try {
        const { nombre, permisos } = req.body
        const result = await RepositorioRol.crear({ nombre, permisos })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.rol)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const eliminarRol = async (req, res) => {
    try {
        const { nombre } = req.body
        const result = await RepositorioRol.eliminar({ nombre })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json({ msg: result.msg });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}

export const editarRol = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, permisos } = req.body;
        const result = await RepositorioRol.editar({ id, nombre, permisos })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }

        res.status(200).json({ msg: result.msg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtenerRoles = async (req, res) => {
    try {
        const { rows: roles } = await pool.query('SELECT * FROM roles');
        res.json(roles);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
