import pool from "../config/pg.js";

export class RepositorioRol {
    static async create({ nombre }) {
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
}