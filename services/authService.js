import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const generarToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}


export const getUserFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded; // Devuelve el objeto decodificado con los datos del usuario
    } catch (error) {
        // Manejo de errores
        return null;
    }
}