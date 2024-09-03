//backen/services/usuarioServices
import pool from "../config/pg.js";
import bcryptjs from "bcryptjs"

export class RepositorioUsuario {
    static async create({ ci, nombre, email, password }) {
        try {
            const { rows: [existeUsuario] } = await pool.query('SELECT * FROM usuarios WHERE ci = $1', [ci]);

            if (existeUsuario) {
                return { error: "Ya existe un usuario con esta cédula de identidad" };
            }

            const hashedPassword = await bcryptjs.hash(password, 10);
            const { rows: [user] } = await pool.query(
                'INSERT INTO usuarios (ci, nombre, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
                [ci, nombre, email, hashedPassword]
            );
            return { user };
        } catch (error) {
            return { error: error.message };
        }
    }
    static async login({ ci, password }) {
        try {
            if (!ci || !password) {
                return { error: "CI y contraseña son obligatorios." };
            }

            // Consulta para buscar al usuario por CI en PostgreSQL
            const queryText = 'SELECT * FROM usuarios WHERE ci = $1';
            const result = await pool.query(queryText, [ci]);

            // Verificamos si el usuario existe
            if (result.rows.length === 0) {
                throw new Error("Usuario con esta cédula de identidad no existe.");
            }

            const user = result.rows[0];

            // Comparamos la contraseña ingresada con la almacenada en la base de datos
            const esIgual = await bcryptjs.compare(password, user.password);
            if (!esIgual) {
                throw new Error("Contraseña incorrecta.");
            }

            return { user };
        } catch (error) {
            return { error: error.message };
        }
    }
}