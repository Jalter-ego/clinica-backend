import pool from '../config/pg.js'

export class RepositorioPermiso {
    static async crear({ nombre }) {
        try {
            const { rows: [existePermiso] } = await pool.query('SELECT * FROM permisos WHERE nombre = $1', [nombre]);
            if (existePermiso) {
                return { error: "Ya existe un permiso con este nombre" };
            }

            const { rows: [permiso] } = await pool.query(
                'INSERT INTO permisos (nombre) VALUES ($1) RETURNING *',
                [nombre]
            );
            return { permiso }
        } catch (err) {
            return { error: err.message }
        }
    }
}

