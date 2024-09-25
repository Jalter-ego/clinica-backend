import { RepositorioPaciente } from "../services/pacienteServices.js"


export const crearPaciente = async (req, res) => {
    try {
        const { direccion, usuario_id } = req.body
        const result = await RepositorioPaciente.crear({ direccion, usuario_id })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.paciente)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const listarPaciente = async (req, res) => {
    try {
        const result = await RepositorioPaciente.listar();

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.paciente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtenerPaciente = async (req, res) => {
    try {
        const { id } = req.body;
        const result = await RepositorioPaciente.obtener({ id });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.paciente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const editarPaciente = async (req, res) => {
    try {
        const { id, direccion, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono, estado, genero} = req.body;
        const result = await RepositorioPaciente.editar({ id, direccion, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono, estado, genero});

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.paciente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

