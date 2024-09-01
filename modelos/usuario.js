//backend/modelos/usuario.js
import mongoose from "mongoose";

export const esquemaUsuario = mongoose.Schema({
    ci: {
        require: true,
        type: String,
        trim: true
    },
    nombre: {
        require: true,
        type: String,
        trim: true
    },
    email: {
        require: true,
        type: String,
        trim: true
    },
    password: {
        require: true,
        type: String,
    }
})

export const usuario = mongoose.model("usuario", esquemaUsuario)
