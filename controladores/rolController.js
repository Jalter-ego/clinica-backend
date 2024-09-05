import { RepositorioRol } from "../services/rolesServices.js";

export const crearRol = async (req, res) => {
    try {
        const { nombre } = req.body
        const result = await RepositorioRol.crear({ nombre })

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