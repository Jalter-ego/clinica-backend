import jwt from 'jsonwebtoken'

export const generarToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}

export const validarToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}