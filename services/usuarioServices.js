//backen/services/usuarioServices
import pool from "../config/pg.js";
import bcryptjs from "bcryptjs"

export class RepositorioUsuario {
    static async create({ ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, password }) {
        try {
            // Verificar si el usuario ya existe por su CI
            const { rows: [existeUsuario] } = await pool.query('SELECT * FROM usuarios WHERE ci = $1', [ci]);

            if (existeUsuario) {
                return { error: "Ya existe un usuario con esta cédula de identidad" };
            }

            // Hashear el password
            const hashedPassword = await bcryptjs.hash(password, 10);

            // Insertar el nuevo usuario
            const { rows: [user] } = await pool.query(
                'INSERT INTO usuarios (ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, hashedPassword]
            );

            // Devolver el usuario creado
            return { user };
        } catch (error) {
            // Manejar cualquier error que ocurra en la base de datos
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

    static async eliminar({ ci }) {
        try {
            const { rows: [existeUsuario] } = await pool.query('select * from usuarios where ci = $1', [ci])
            if (!existeUsuario) {
                return { error: "no existe el usuario" }
            }

            await pool.query('delete from usuarios where ci = $1', [ci])
            return { msg: "usuario eliminado exitosamente" }
        } catch (err) {
            return { error: err.message }
        }

    }

    static async getUsuarios() {
        try {
            const { rows: usuarios } = await pool.query('select * from usuarios')
            if (!usuarios) {
                return { error: "no existen usuarios" }
            }
            return { usuarios }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async getUsuario({ ci }) {
        try {
            const { rows: [usuario] } = await pool.query('select * from usuarios where ci= $1', [ci])
            if (!usuario) {
                return { error: "no existe el usuario" }
            }
            return { usuario }
        } catch (err) {
            return { error: err.message }
        }
    }

    // Repositorio: actualiza el usuario en la base de datos
    static async edit({ id, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento,
        email, password, rol_id, estado, telefono, genero }) {
        try {
            const consulta = `
            UPDATE usuarios
            SET
                ci = $1,
                nombre = $2,
                apellido_paterno = $3,
                apellido_materno = $4,
                fecha_nacimiento = $5,
                email = $6,
                password = $7,
                rol_id = $8,
                estado = $9,
                telefono = $10,
                genero = $11
            WHERE id = $12
            RETURNING *
            `;
            const hashedPassword = await bcryptjs.hash(password, 10);
            const values = [
                ci,
                nombre,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                email,
                hashedPassword,
                rol_id,
                estado,
                telefono,
                genero,
                id
            ];

            const { rows } = await pool.query(consulta, values);

            if (rows.length === 0) {
                return { error: "No se encontró el usuario con el id proporcionado" };
            }

            return { usuario: rows[0] };
        } catch (err) {
            return { error: err.message };
        }
    }


}