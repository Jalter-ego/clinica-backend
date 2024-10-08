import { RepositorioEspecialidades } from "../services/especialidadesServices.js";


export const crearEspecialidades = async (req, res) => {
    try {
        const { nombre, tiempo_estimado } = req.body
        const result = await RepositorioEspecialidades.crear({ nombre, tiempo_estimado })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.especialidad)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const editarEspecialides = async (req, res) => {
    try {
        const { id, nombre, tiempo_estimado } = req.body;
        const result = await RepositorioEspecialidades.editar({ id, nombre,tiempo_estimado });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.especialidad);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const listarEspecialidades = async (req, res) => {
    try {
        const result = await RepositorioEspecialidades.listar();

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.especialidad);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const eliminarEspecialidades = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await RepositorioEspecialidades.eliminar({ id });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json({ msg: result.msg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
