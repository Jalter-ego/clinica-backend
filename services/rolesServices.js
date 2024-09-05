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
        } catch (error) {
            return { error: error.message };
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
}