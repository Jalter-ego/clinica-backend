import pool from '../config/pg.js'

export class RepositorioEmpleado{

    static async buscar({ ci }) {
        try {
            const { rows: [UsuarioExistente] } = await pool.query('SELECT * FROM usuarios WHERE ci = $1', [ci]);
            if (!UsuarioExistente) {
                return { error: "No existe un Usuario con ese CI" };
            }
    
           const { rows: [usuario] } = await pool.query('SELECT usuarios.id,ci,usuarios.nombre,apellido_paterno,email,fecha_nacimiento,telefono,genero,roles.nombre as rol_nombre FROM usuarios, roles WHERE rol_id=roles.id and ci = $1', [ci]);
            return { usuario }
        } catch (err) {
            return { error: err.message }
        }
    }
    


    static async crear({ direccion,fecha_contratacion,usuario_id,profesiones_id, estadoo,rol_id }) {
        try {
            const { rows: [existeEmpleado] } = await pool.query('SELECT * FROM empleado WHERE usuario_id = $1', [usuario_id]);
            if (existeEmpleado) {
                return { error: "El empleado ya estaba registrado" };
            }

            const { rows: [empleado] } = await pool.query(
                'INSERT INTO empleado (direccion, fecha_contratacion, usuario_id, profesiones_id,estadoo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [direccion,fecha_contratacion,usuario_id,profesiones_id, estadoo]
            );


            //actualizar el rol del usuario
            await pool.query(
                'UPDATE usuarios SET rol_id = $1 WHERE id = $2',
                [rol_id, usuario_id]
            );
    

            return { empleado }
        } catch (err) {
            return { error: err.message }
        }
    }


    static async listar() {
        try {
            // Consulta para seleccionar los datos de la tabla 'empleado' y 'usuarios'
            const { rows: empleado } = await pool.query(`
                SELECT 
                    empleado.id AS empleado_id,
                    usuarios.ci,
                    usuarios.nombre,
                    usuarios.apellido_paterno,
                    usuarios.apellido_materno,
                    usuarios.fecha_nacimiento,
                    usuarios.email,
                    usuarios.telefono,
                    usuarios.estado,
                    usuarios.genero,
                    empleado.direccion,
                    empleado.fecha_contratacion,
                    profesiones.nombre As profesion,
                    empleado.estadoo
                FROM 
                    empleado, usuarios, profesiones
                WHERE 
                    empleado.usuario_id = usuarios.id and profesiones_id=profesiones.id
            `);
            return { empleado };
        } catch (err) {
            return { error: err.message };
        }
    }
    

    static async obtener({ id }) {
        try {
            const { rows: [EmpleadoExistente] } = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
            if (!EmpleadoExistente) {
                return { error: "No existe el empleado no existe" };
            }
    
           const { rows: [empleado] } = await pool.query(`
                SELECT 
                    empleado.id AS empleado_id,
                    usuarios.ci,
                    usuarios.nombre,
                    usuarios.apellido_paterno,
                    usuarios.apellido_materno,
                    usuarios.fecha_nacimiento,
                    usuarios.email,
                    usuarios.telefono,
                    usuarios.estado,
                    usuarios.genero,
                    empleado.direccion,
                    empleado.fecha_contratacion,
                    profesiones.nombre As profesion,
                    empleado.estadoo
                FROM 
                    empleado, usuarios, profesiones
                WHERE 
                    empleado.id=$1 and empleado.usuario_id = usuarios.id and  profesiones_id=profesiones.id
            `, [id]);
            return { empleado }
        } catch (err) {
            return { error: err.message }
        }
    }


    static async editar({ id, direccion, fecha_contratacion, estadoo, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono, estado, genero,profesiones_id}) {
        try {
            // Verificar si el empleado existe
            const { rows: [EmpleadoExistente] } = await pool.query('SELECT * FROM empleado WHERE id = $1', [id]);
            if (!EmpleadoExistente) {
                return { error: "El empleado no existe" };
            }
    
            // Actualizar los datos del empleado en la tabla 'empleado'
            const { rows: [empleado] } = await pool.query(`
                UPDATE empleado
                SET direccion = $1, fecha_contratacion = $2, estadoo = $3, profesiones_id = $4
                WHERE id = $5
                RETURNING *
            `, [direccion, fecha_contratacion, estadoo,profesiones_id, id]);
    
            // Actualizar los datos del usuario en la tabla 'usuarios'
            await pool.query(`
                UPDATE usuarios
                SET ci = $1, nombre = $2, apellido_paterno = $3, apellido_materno = $4, fecha_nacimiento = $5, email = $6, telefono = $7, estado = $8, genero = $9
                WHERE id = $10
            `, [ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, telefono, estado, genero, empleado.usuario_id]);
    
            return { empleado };
        } catch (err) {
            return { error: err.message };
        }
    }
    



}