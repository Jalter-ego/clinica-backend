import pool from "../config/pg.js";

export class RepositorioRol {
    static async crear({ nombre }) {
        try {
            const { rows: [existeRol] } = await pool.query('SELECT * FROM roles WHERE nombre = $1', [nombre]);
            if (existeRol) {
                return { error: "Ya existe un rol con este nombre" };
            }

            const { rows: [rol] } = await pool.query(
                'INSERT INTO roles (nombre) VALUES ($1) RETURNING *',
                [nombre]
            );
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

    static async editar({ id, nombre }) {
        try {
            const { rows: [existeRol] } = await pool.query('SELECT * FROM roles WHERE id = $1', [id])
            if (!existeRol) {
                return { error: "No existe el rol" };
            }

            await pool.query('UPDATE roles SET nombre = $1 WHERE id = $2', [nombre, id]);
            return { msg: "Rol editado correctamente" }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async agregarPermisos({ idRol, permisos }) {
        try {
            const { rows: [existeRol] } = await pool.query('SELECT * FROM roles WHERE id = $1', [idRol])
            if (!existeRol) {
                return { error: "No existe el rol" };
            }
            // 1. Eliminar todos los permisos actuales del rol
            await pool.query('DELETE FROM roles_permisos WHERE rol_id = $1', [idRol]);

            // 2. Insertar los nuevos permisos
            for (const permiso of permisos) {
                const { id } = permiso;

                // Verificar que el permiso existe
                const { rows: [permisoExistente] } = await pool.query('SELECT * FROM permisos WHERE id = $1', [id]);
                if (!permisoExistente) {
                    return { error: `El permiso con id ${id} no existe` };
                }

                // Insertar el nuevo permiso para el rol
                await pool.query('INSERT INTO roles_permisos (rol_id, permiso_id) VALUES ($1, $2)', [idRol, id]);
            }

            const { rows: [rolConPermisos] } = await pool.query(`
                SELECT 
                    r.id AS rol_id, 
                    r.nombre AS rol_nombre, 
                    json_agg(json_build_object('id', p.id, 'nombre', p.nombre)) AS permisos
                FROM roles r
                LEFT JOIN roles_permisos rp ON r.id = rp.rol_id
                LEFT JOIN permisos p ON rp.permiso_id = p.id
                WHERE r.id = $1
                GROUP BY r.id
            `, [idRol]);

            return {
                id: rolConPermisos.rol_id,
                nombre: rolConPermisos.rol_nombre,
                permisos: rolConPermisos.permisos
            };

        } catch (err) {
            return { error: err.message }
        }
    }

    static async getRolesPermisos() {
        try {
            // Consulta para obtener los roles con sus permisos
            const { rows: rolesConPermisos } = await pool.query(`
                SELECT 
                    r.id AS rol_id, 
                    r.nombre AS rol_nombre, 
                    COALESCE(json_agg(json_build_object('id', p.id, 'nombre', p.nombre)) 
                    FILTER (WHERE p.id IS NOT NULL), '[]') AS permisos
                FROM roles r
                LEFT JOIN roles_permisos rp ON r.id = rp.rol_id
                LEFT JOIN permisos p ON rp.permiso_id = p.id
                GROUP BY r.id
            `);

            return rolesConPermisos.map(rol => ({
                id: rol.rol_id,
                nombre: rol.rol_nombre,
                permisos: rol.permisos
            }));

        } catch (err) {
            return { error: err.message };
        }
    }

}