import { check } from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'

export const validateCreate = [
    check('nombre').not().isEmpty(),
    check('ci').not().isEmpty().isNumeric(),
    check('email').isEmail().not().isEmpty(),
    check('telefono').not().isEmpty().isNumeric(),
    check('genero').not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }

]