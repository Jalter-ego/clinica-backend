//backen/services/usuarioServices
import { usuario } from "../modelos/usuario.js"
import bcryptjs from "bcryptjs"

export class RepositorioUsuario {
    static async create({ ci, nombre, email, password }) {
        try {
            const existeUsuario = await usuario.findOne({ ci });

            if (existeUsuario) {
                return { error: "Ya existe un usuario con esta cédula de identidad" };
            }

            const hashedPassword = await bcryptjs.hash(password, 10);
            let user = new usuario({
                ci,
                nombre,
                email,
                password: hashedPassword
            });
            user = await user.save();

            return { user };
        } catch (error) {
            return { error: error.message };
        }
    }
    static async login({ ci, password }) {
        try {
            if (!ci || !password) {
                return { error: "CI y contraseña son obligatorios." };
            }
            const user = await usuario.findOne({ ci });

            if (!user) {
                throw new Error("Usuario con esta cédula de identidad no existe.");
            }

            const esIgual = await bcryptjs.compare(password, user.password);
            if (!esIgual) {
                throw new Error("Contraseña incorrecta.");
            }
            return { user }
        } catch (error) {
            return { error: error.message };
        }
    }
}