import pool from "../config/pg.js"
import { RepositorioPermiso } from "../services/permisoServices.js";

export const crearPermiso = async (req, res) => {
    try {
        const { nombre } = req.body
        const result = await RepositorioPermiso.crear({ nombre })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }

        res.json(result.permiso)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const eliminarPermiso = async (req, res) => {
    try {
        const { nombre } = req.body
        const result = await RepositorioPermiso.eliminar({ nombre })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }

        res.json({ msg: result.msg })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const editarPermiso = async (req, res) => {
    try {
        const { newNombre, id } = req.body
        const result = await RepositorioPermiso.editar({ newNombre, id })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }

        res.json(result.permiso)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const obtenerPermisos = async (req, res) => {
    try {
        const result = await RepositorioPermiso.getPermisos()
        if (result.error) {
            return res.status(400).json({ mss: result.error })
        }
        res.json(result.permisos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const obtenerPermiso = async (req, res) => {
    try {
        const { ci } = req.query
        const result = await RepositorioPermiso.getPermisoByUser({ ci })
        if (result.error) {
            return res.status(400).json({ mss: result.error })
        }
        res.json(result.permisos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}