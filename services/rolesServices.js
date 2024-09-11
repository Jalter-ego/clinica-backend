import pool from "../config/pg.js";

export class RepositorioRol {
    static async crear({ nombre, permisos }) {
        try {
            const { rows: [existeRol] } = await pool.query('SELECT * FROM roles WHERE nombre = $1', [nombre]);
            if (existeRol) {
                return { error: "Ya existe un rol con este nombre" };
            }

            const { rows: [rol] } = await pool.query(
                'INSERT INTO roles (nombre) VALUES ($1) RETURNING *',
                [nombre]
            );

            if (permisos && permisos.length > 0) {
                for (const permisoId of permisos) {
                    await pool.query(
                        'INSERT INTO roles_permisos (rol_id, permiso_id) VALUES ($1, $2)',
                        [rol.id, permisoId]
                    );
                }
            }
            return { rol };
        } catch (err) {
            return { error: err.message };
        }
    }

    static async eliminar({ nombre }) {
        try {
            const { rows: [existeRol] } = await pool.query('SELECT * FROM roles WHERE nombre = $1', [nombre])
            if (!existeRol) {
                return { error: "No existe un rol con este nombre" };
            }

            await pool.query('DELETE FROM roles WHERE nombre = $1', [nombre]);
            return { msg: "Rol eliminado exitosamente" };
        } catch (err) {
            return { error: err.message }
        }
    }

    static async editar({ id, nombre, permisos }) {
        try {
            if (nombre) {
                await pool.query('UPDATE roles SET nombre = $1 WHERE id = $2', [nombre, id]);
            }

            if (permisos) {
                await pool.query('DELETE FROM rol_permisos WHERE rol_id = $1', [id]);

                for (const permiso of permisos) {
                    await pool.query('INSERT INTO rol_permisos (rol_id, permiso_id) VALUES ($1, $2)', [id, permiso]);
                }
            }

            return { msg: "Rol editado correctamente" }
        } catch (err) {
            return { error: err.message }
        }
    }
}