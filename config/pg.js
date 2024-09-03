import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // Asegúrate de que la ruta sea correcta

console.log('POSTGRES_URL:', process.env.POSTGRES_URL);

const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL,
    //ssl: true
})

export default pool  