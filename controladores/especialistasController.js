// especialistasController.js
import { RepositorioEspecialistas } from "../services/especialistasService.js";

// Crear una nueva relación entre empleado y varias especialidades
export const crearEspecialista = async (req, res) => {
    try {
        const { empleado_id, especialidades } = req.body;

        // Asegúrate de que 'especialidades' es un array
        if (!Array.isArray(especialidades)) {
            return res.status(400).json({ msg: "El campo 'especialidades' debe ser un array de IDs de especialidades" });
        }

        const result = await RepositorioEspecialistas.crear({ empleado_id, especialidades });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Editar las relaciones de un empleado con nuevas especialidades
export const editarEspecialista = async (req, res) => {
    try {
        const { empleado_id, especialidades } = req.body;

        // Asegúrate de que 'especialidades' es un array
        if (!Array.isArray(especialidades)) {
            return res.status(400).json({ msg: "El campo 'especialidades' debe ser un array de IDs de especialidades" });
        }

        const result = await RepositorioEspecialistas.editar({ empleado_id, especialidades });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const listarEspecialistas = async (req, res) => {
    try {
        const result = await RepositorioEspecialistas.listar();

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.empleados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Eliminar todas las relaciones de especialidades para un empleado
export const eliminarEspecialista = async (req, res) => {
    try {
        const { empleado_id } = req.body;

        // Validar que se haya proporcionado el empleado_id
        if (!empleado_id) {
            return res.status(400).json({ msg: "El campo 'empleado_id' es requerido para eliminar las especialidades" });
        }

        const result = await RepositorioEspecialistas.eliminar({ empleado_id });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json({ msg: result.msg });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
