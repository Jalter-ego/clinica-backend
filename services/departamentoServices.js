import pool from '../config/pg.js'

export class RepositorioDepartamento {
    static async crear({ nombre }) {
        try {
            const { rows: [existeDepartamento] } = await pool.query
                ('SELECT * FROM departamentos WHERE nombre = $1', [nombre]);
            if (existeDepartamento) {
                return { error: "El departamento ya esta registrado" };
            }
            const { rows: [departamento] } = await pool.query('insert into departamentos(nombre) values ($1) RETURNING *', [nombre])
            return { departamento }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async editar({ id, nombre }) {
        try {
            const { rows: [existeDepartamento] } = await pool.query
                ('SELECT * FROM departamentos WHERE id = $1', [id]);
            if (!existeDepartamento) {
                return { error: "El departamento no esta registrado" };
            }
            await pool.query('update departamentos set nombre = $1 where id = $2', [nombre, id])
            return { msg: "departamento editado correctamente" }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async eliminar({ id }) {
        try {
            const { rows: [existeDepartamento] } = await pool.query
                ('SELECT * FROM departamentos WHERE id = $1', [id]);
            if (!existeDepartamento) {
                return { error: "El departamento no esta registrado" };
            }
            await pool.query('delete from departamentos WHERE id = $1', [id])
            return { msg: "departamento eliminado correctamente" }
        } catch (err) {
            return { error: err.message }
        }
    }

    static async listar() {
        try {

            const { rows: departamentos } = await pool.query('select * from departamentos')
            return { departamentos }
        } catch (err) {
            return { error: err.message }
        }
    }
}