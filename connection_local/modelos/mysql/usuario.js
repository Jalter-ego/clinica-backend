import mysql from 'mysql2/promise';

// Configuración de la conexión
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '86EightySix',
    database: 'clinica'
};

// Crear una conexión a la base de datos
const connection = await mysql.createConnection(config);

export class usuarioModel {
    // Obtener todos los usuarios con un filtro específico
    static async getAll({ roles }) {

        if (roles) {

            const lowerCaseRoles = roles.toLowerCase()

            const [roles] = await connection.query(
                'select * from roles where lower(name) = ?;', [lowerCaseRoles]
            )

            if (roles.length === 0) return []

            const [{ id }] = roles
            return []

        }



        try {
            const [usuarios] = await connection.query(
                'SELECT * FROM usuarios WHERE id = 1;'
            );
            console.log(usuarios); // Asegúrate de usar 'usuarios' en lugar de 'result'
            return usuarios;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    // Obtener usuario por ID
    static async getById({ id }) {
        // Implementa la lógica aquí
        const [usuarios] = await connection.query(
            'SELECT * FROM usuarios WHERE id = (?);', [id]
        );

        if (usuarios.length === 0) return null

        return usuarios[0]
    }



    // Crear un nuevo usuario
    static async create({ input }) {
        // Implementa la lógica aquí
    }

    // Eliminar un usuario
    static async delete({ id }) {
        // Implementa la lógica aquí
    }

    // Actualizar un usuario existente
    static async update({ id, input }) {
        // Implementa la lógica aquí
    }
}
