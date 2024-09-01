//backend/controladores/UsuarioController
import { RepositorioUsuario } from "../services/usuarioServices.js"
import { generarToken } from "../services/authService.js";

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
            nombre: user.nombre
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
            nombre: user.nombre
        }
        const token = generarToken(payload)

        /*const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);*/
        //res.send({ token, user })

        res.json({
            token
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}