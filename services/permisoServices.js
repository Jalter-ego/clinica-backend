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

    static async eliminar({ nombre }) {
        try {
            const { rows: [existePermiso] } = await pool.query('SELECT * FROM permisos WHERE nombre = $1', [nombre]);
            if (!existePermiso) {
                return { error: "No existe un permiso con este nombre" };
            }

            await pool.query('Delete from permisos where nombre = $1', [nombre]);

            return { msg: "permiso eliminado" }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async editar({ newNombre, id }) {
        try {
            const { rows: [existePermiso] } = await pool.query('select * from permisos where id = $1', [id])
            if (!existePermiso) {
                return { error: "No existe un permiso con este nombre" };
            }

            const { rows: [permiso] } = await pool.query('update permisos set nombre = $1 where id = $2 returning *',
                [newNombre, id])
            return { permiso }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async getPermisos() {
        try {
            const { rows: permisos } = await pool.query('select * from permisos')
            if (!permisos) {
                return { error: "no hay existen permisos" }
            }

            return { permisos }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async getPermisoByUser({ ci }) {
        try {
            const consulta = `SELECT permisos.id, permisos.nombre 
                              FROM permisos
                              INNER JOIN roles_permisos ON permisos.id = roles_permisos.permiso_id
                              INNER JOIN usuarios ON usuarios.rol_id = roles_permisos.rol_id
                              WHERE usuarios.ci = $1`;

            const { rows: permisos } = await pool.query(consulta, [ci]);

            if (permisos.length === 0) {
                return { error: "No existen permisos para este usuario" };
            }

            return { permisos };
        } catch (err) {
            return { error: err.message };
        }
    }

}



