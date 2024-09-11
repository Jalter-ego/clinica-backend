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