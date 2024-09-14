import {check} from 'express-validator'
import { validateResult } from '../helpers/validateHelper.js'


//ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, password
// exists=que exista , not=que no sea .isEmpty= vacio
export const validateCreate=[
    check('ci').exists().not().isEmpty(),
    check('nombre').exists().not().isEmpty(),
    check('apellido_paterno').exists().not().isEmpty(),
    check('apellido_materno').exists().not().isEmpty(),
    check('fecha_nacimiento').exists().isDate().not().isEmpty(),
    check('email').exists().isEmail().not().isEmpty(),
    (req,res,next)=>{
        validateResult(req,res,next)
    }

]

