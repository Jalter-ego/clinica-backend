//services/middleware.js
import jwt from 'jsonwebtoken'
import pool from '../config/pg.js'

export const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token requerido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

export const verificarPermiso = (permiso) => {
    return async (req, res, next) => {
        const usuarioId = req.usuarioId;

        try {
            const query = `
                SELECT p.nombre 
                FROM permisos p
                JOIN roles_permisos rp ON p.id = rp.permiso_id
                JOIN roles r ON r.id = rp.rol_id
                JOIN usuarios u ON u.rol_id = r.id
                WHERE u.id = $1 AND p.nombre = $2

            `;

            const { rows } = await pool.query(query, [usuarioId, permiso]);

            if (rows.length === 0) {
                return res.status(403).json({ msg: 'No tienes permisos para realizar esta acción' });
            }

            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar los permisos' });
        }
    };
};


