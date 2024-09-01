// backend/config/database.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const DB = process.env.MONGO_URI; // Usar variable de entorno
        await mongoose.connect(DB).then();
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
};

export default connectDB;
