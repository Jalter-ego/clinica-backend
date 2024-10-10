import { RepositorioDepartamento } from "../services/departamentoServices.js"

export const crearDepartamento = async (req, res) => {
    try {
        const { nombre } = req.body
        const result = await RepositorioDepartamento.crear({ nombre })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.departamento)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const editarDepartamento = async (req, res) => {
    try {
        const { id, nombre } = req.body
        const result = await RepositorioDepartamento.editar({ id, nombre })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.msg)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const eliminarDepartamento = async (req, res) => {
    try {
        const { id } = req.body
        const result = await RepositorioDepartamento.eliminar({ id })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.msg)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const listarDepartamentos = async (req, res) => {
    try {
        const result = await RepositorioDepartamento.listar()

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.departamentos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}