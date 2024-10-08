import pool from '../config/pg.js'


export class RepositorioEspecialidades {

    static async crear({ nombre }) {
        try {
            const { rows: [existeEspecialidades] } = await pool.query('SELECT * FROM especialidades WHERE nombre = $1', [nombre]);
            if (existeEspecialidades) {
                return { error: "Ya existe una especialidad con este nombre" };
            }

            const { rows: [especialidad] } = await pool.query(
                'INSERT INTO especialidades (nombre) VALUES ($1) RETURNING *',
                [nombre]
            );
            return { especialidad }
        } catch (err) {
            return { error: err.message }
        }
    }


    static async editar({ id, nombre }) {
        try {
            const { rows: [especialidadExistente] } = await pool.query('SELECT * FROM especialidades WHERE id = $1', [id]);
            if (!especialidadExistente) {
                return { error: "No existe una especialidad con ese ID" };
            }

            const { rows: [especialidad] } = await pool.query(
                'UPDATE especialidades SET nombre = $1 WHERE id = $2 RETURNING *',
                [nombre, id]
            );
            return { especialidad }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async listar() {
        try {
            const { rows: especialidad } = await pool.query('SELECT * FROM especialidades');
            return { especialidad };
        } catch (err) {
            return { error: err.message };
        }
    }


    static async eliminar({ id }) {
        try {
            const { rows: [especialidadExistente] } = await pool.query('SELECT * FROM especialidades WHERE id = $1', [id]);
            if (!especialidadExistente) {
                return { error: "No existe una especialidad con ese ID" };
            }

            await pool.query('DELETE FROM especialidades WHERE id = $1', [id]);
            return { msg: "especialidad eliminada correctamente" };
        } catch (err) {
            return { error: err.message };
        }
    }
}