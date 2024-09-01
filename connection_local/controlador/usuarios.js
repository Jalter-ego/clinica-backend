//import { MovieModel } from '../models/local-file-system/movie.js'
// import { MovieModel } from '../models/database/movie.js'

import { usuarioModel } from '../modelos/mysql/usuario.js'
//import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class usuarioController {
    static async getAll(req, res) {
        const { roles } = req.query
        const usuarios = await usuarioModel.getAll({ roles })
        res.json(usuarios)
    }

    static async getById(req, res) {
        const { id } = req.params
        const usuario = await usuarioModel.getById({ id })
        if (usuario) return res.json(usuario)
        res.status(404).json({ message: 'Usuario not found' })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newUsuario = await usuarioModel.create({ input: result.data })

        res.status(201).json(newUsuario)
    }

    static async delete(req, res) {
        const { id } = req.params

        const result = await usuarioModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Usario not found' })
        }

        return res.json({ message: 'Usuario deleted' })
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedUsuario = await usuarioModel.update({ id, input: result.data })

        return res.json(updatedUsuario)
    }
}