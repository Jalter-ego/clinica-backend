import pool from '../config/pg.js'

export class RepositorioPaciente {


    static async crear({ direccion, usuario_id }) {
        try {
            const { rows: [existePaciente] } = await pool.query('SELECT * FROM paciente WHERE usuario_id = $1', [usuario_id]);
            if (existePaciente) {
                return { error: "El paciente ya estaba registrado" };
            }

            const { rows: [paciente] } = await pool.query(
                'INSERT INTO paciente (direccion, usuario_id ) VALUES ($1, $2) RETURNING *',
                [direccion, usuario_id ]
            );

            return { paciente }
        } catch (err) {
            return { error: err.message }
        }
    }


    static async listar() {
        try {
            // Consulta para seleccionar los datos de la tabla 'empleado' y 'usuarios'
            const { rows: paciente } = await pool.query(`
                SELECT 
                    paciente.id AS paciente_id,
                    usuarios.ci,
                    usuarios.nombre,
                    usuarios.apellido_paterno,
                    usuarios.apellido_materno,
                    usuarios.fecha_nacimiento,
                    usuarios.email,
                    usuarios.telefono,
                    usuarios.estado,
                    usuarios.genero,
                    paciente.direccion,
                    roles.nombre As rol
                FROM 
                    paciente, usuarios, roles
                WHERE 
                    paciente.usuario_id = usuarios.id and usuarios.rol_id =roles.id
            `);
            return { paciente };
        } catch (err) {
            return { error: err.message };
        }
    }


    static async obtener({ id }) {
        try {
            const { rows: [pacienteExistente] } = await pool.query('SELECT * FROM paciente WHERE id = $1', [id]);
            if (!pacienteExistente) {
                return { error: "No existe el paciente " };
            }

            const { rows: [paciente] } = await pool.query(`
                SELECT 
                    paciente.id,
                    usuarios.ci,
                    usuarios.nombre,
                    usuarios.apellido_paterno,
                    usuarios.apellido_materno,
                    usuarios.fecha_nacimiento,
                    usuarios.email,
                    usuarios.telefono,
                    usuarios.estado,
                    usuarios.genero,
                    paciente.direccion
                    FROM 
                    paciente, usuarios
                WHERE 
                    paciente.id=$1 and paciente.usuario_id = usuarios.id
            `, [id]);
            return { paciente }
        } catch (err) {
            return { error: err.message }
        }
    }


    static async editar({ id, direccion, ci, nombre, apellido_paterno,
        apellido_materno, fecha_nacimiento, email, telefono, estado, genero }) {
        try {
            // Verificar si el empleado existe
            const { rows: [pacienteExistente] } = await pool.query('SELECT * FROM paciente WHERE id = $1', [id]);
            if (!pacienteExistente) {
                return { error: "El paciente no existe" };
            }

            // Actualizar los datos del empleado en la tabla 'empleado'
            const { rows: [paciente] } = await pool.query(`
                UPDATE paciente
                SET direccion = $1
                WHERE id = $2
                RETURNING *
            `, [ direccion, id ]);

            // Actualizar los datos del usuario en la tabla 'usuarios'
            await pool.query(`
                UPDATE usuarios
                SET ci = $1, nombre = $2, apellido_paterno = $3, apellido_materno = $4, 
                fecha_nacimiento = $5, email = $6, telefono = $7, estado = $8, genero = $9
                WHERE id = $10
            `, [ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email,
                telefono, estado, genero, paciente.usuario_id]);

            return { paciente };
        } catch (err) {
            return { error: err.message };
        }
    }

 
}