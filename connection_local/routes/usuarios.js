import { Router } from 'express'

import { usuarioController } from '../controlador/usuarios.js'

export const usuarioRouter = Router()

usuarioRouter.get('/', usuarioController.getAll)
usuarioRouter.post('/', usuarioController.create)

usuarioRouter.get('/:id', usuarioController.getById)
usuarioRouter.delete('/:id', usuarioController.delete)
usuarioRouter.patch('/:id', usuarioController.update)