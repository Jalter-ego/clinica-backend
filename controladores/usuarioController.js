//backend/controladores/UsuarioController
import { RepositorioUsuario } from "../services/usuarioServices.js"
import { generarToken } from "../services/authService.js";
import pool from "../config/pg.js"

export const registerHandler = async (req, res) => {
    try {
        const { ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, password } = req.body;
        const user = await RepositorioUsuario.create({
            ci, nombre, apellido_paterno,
            apellido_materno, fecha_nacimiento, email, password
        });

        if (user.error) {
            return res.status(400).json({ msg: user.error });
        }
        const payload = {
            id: user.user.id,
            rol_id: user.user.rol_id
        };
        const token = generarToken(payload);

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const loginHandler = async (req, res) => {
    try {
        const { ci, password } = req.body

        const result = await RepositorioUsuario.login({ ci, password })
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        const user = result.user
        const payload = {
            ci: user.ci,
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

export const getUsuarios = async (req, res) => {
    try {
        const { rows: usuarios } = await pool.query('select * from usuarios')
        if (!usuarios) {
            return { error: "no existe usuarios" }
        }
        res.json({ usuarios })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getUsuario = async (req, res) => {
    try {
        const usuarioCi = req.usuarioCi
        console.log(usuarioCi)

        const { rows: [usuario] } = await pool.query('select * from usuarios where ci= $1', [usuarioCi])
        if (!usuario) {
            return res.status(404).json({ error: "No existe el usuario" });
        }
        res.json(usuario)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


