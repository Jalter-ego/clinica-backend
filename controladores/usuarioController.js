//backend/controladores/UsuarioController
import { RepositorioUsuario } from "../services/usuarioServices.js"
import { generarToken, getUserFromToken } from "../services/authService.js";

export const registerHandler = async (req, res) => {
    try {
        const { ci, nombre, email, password } = req.body;
        const user = await RepositorioUsuario.create({ ci, nombre, email, password });

        if (user.error) {
            return res.status(400).json({ msg: user.error });
        }
        const payload = {
            id: user._id,
            ci: user.ci,
            nombre: user.nombre,
            rol_id: user.rol_id
        }
        const token = generarToken(payload)

        // Retornar solo el token
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const loginHandler = async (req, res) => {
    try {
        const { ci, password } = req.body

        const result = await RepositorioUsuario.login({ ci, password })
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        const user = result.user
        const payload = {
            id: user._id,
            ci: user.ci,
            nombre: user.nombre,
            rol_id: user.rol_id
        }
        const token = generarToken(payload)

        res.json({
            token
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const { ci } = req.body
        const result = await RepositorioUsuario.eliminar({ ci })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }

        res.json({ msg: result.msg });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
}

export const verificarToken = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        const userData = getUserFromToken(token)
        if (userData) {
            // Devuelve la información del usuario
            res.json({ nombre: userData.nombre, role: userData.role });
        } else {
            // Token inválido
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {

    }
}

