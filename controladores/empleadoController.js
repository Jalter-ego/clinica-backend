import {RepositorioEmpleado} from "../services/EmpleadoService.js"



export const buscarUsuario = async (req, res) => {
    try {
        const {ci}=req.body;
        const result = await RepositorioEmpleado.buscar({ ci });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const crearEmpleado = async (req, res) => {
    try {
        const { direccion,fecha_contratacion,usuario_id,profesiones_id, estadoo,rol_id } = req.body
        const result = await RepositorioEmpleado.crear({ direccion,fecha_contratacion,usuario_id,profesiones_id, estadoo,rol_id })

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.empleado)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const listarEmpleados = async (req, res) => {
    try {
        const result = await RepositorioEmpleado.listar();

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.empleado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const obtenerEmpleado = async (req, res) => {
    try {
        const {id}=req.body;
        const result = await RepositorioEmpleado.obtener({ id });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.empleado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const editarEmpleado = async (req, res) => {
    try {
        const {id, direccion, fecha_contratacion, estadoo, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono, estado, genero,profesiones_id}=req.body;
        const result = await RepositorioEmpleado.editar({ id, direccion, fecha_contratacion, estadoo, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono, estado, genero,profesiones_id });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }
        res.json(result.empleado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
