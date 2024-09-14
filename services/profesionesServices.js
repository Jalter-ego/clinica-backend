import pool from '../config/pg.js'

export class RepositorioProfesiones {
    static async crear({ nombre }) {
        try {
            const { rows: [existeProfesiones] } = await pool.query('SELECT * FROM profesiones WHERE nombre = $1', [nombre]);
            if (existeProfesiones) {
                return { error: "Ya existe una profesion con este nombre" };
            }

            const { rows: [profesion] } = await pool.query(
                'INSERT INTO profesiones (nombre) VALUES ($1) RETURNING *',
                [nombre]
            );
            return { profesion }
        } catch (err) {
            return { error: err.message }
        }
    }


    static async editar({ id, nombre }) {
        try {
            const { rows: [profesionExistente] } = await pool.query('SELECT * FROM profesiones WHERE id = $1', [id]);
            if (!profesionExistente) {
                return { error: "No existe una profesión con ese ID" };
            }
    
            const { rows: [profesion] } = await pool.query(
                'UPDATE profesiones SET nombre = $1 WHERE id = $2 RETURNING *',
                [nombre, id]
            );
            return { profesion }
        } catch (err) {
            return { error: err.message }
        }
    }
    
    static async listar() {
        try {
            const { rows: profesiones } = await pool.query('SELECT * FROM profesiones');
            return { profesiones };
        } catch (err) {
            return { error: err.message };
        }
    }


    static async eliminar({ id }) {
        try {
            const { rows: [profesionExistente] } = await pool.query('SELECT * FROM profesiones WHERE id = $1', [id]);
            if (!profesionExistente) {
                return { error: "No existe una profesión con ese ID" };
            }
    
            await pool.query('DELETE FROM profesiones WHERE id = $1', [id]);
            return { msg: "Profesión eliminada correctamente" };
        } catch (err) {
            return { error: err.message };
        }
    }
    
    
}