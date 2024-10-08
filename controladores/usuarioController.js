//backend/controladores/UsuarioController
import { RepositorioUsuario } from "../services/usuarioServices.js"
import { generarToken } from "../services/authService.js";
import { RepositorioPermiso } from "../services/permisoServices.js";
import jwt from 'jsonwebtoken'
import { RepositorioRol } from "../services/rolServices.js";

export const registerHandler = async (req, res) => {
    try {
        const { ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, password } = req.body;

        // Crear el usuario
        const result = await RepositorioUsuario.create({
            ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, email, password
        });

        if (result.error) {
            return res.status(400).json({ msg: result.error });
        }

        const user = result.user;

        // Obtener los permisos del usuario recién creado
        const permisosResult = await RepositorioPermiso.getPermisoByUser({ ci });
        if (permisosResult.error) {
            return res.status(400).json({ mss: permisosResult.error });
        }

        const permisos = permisosResult.permisos;

        const rolResutl = await RepositorioRol.getRol({ ci })
        if (rolResutl.error) {
            return res.status(400).json({ mss: rolResutl.error });
        }
        const rol = rolResutl.rol

        // Crear el payload que se almacenará en el token
        const payload = {
            ci: user.ci,
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
            apellido_materno: user.apellido_materno,
            email: user.email,
            telefono: user.telefono,
            rol,
            permisos,
        };
        const token = generarToken(payload);

        return res.json({ token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};



export const loginHandler = async (req, res) => {
    try {
        const { ci, password } = req.body;

        // Verificar si el usuario existe y si la contraseña es correcta
        const result = await RepositorioUsuario.login({ ci, password });
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        const user = result.user;

        // Obtener los permisos del usuario
        const permisosResult = await RepositorioPermiso.getPermisoByUser({ ci });
        if (permisosResult.error) {
            return res.status(400).json({ mss: permisosResult.error });
        }
        const permisos = permisosResult.permisos

        const rolResutl = await RepositorioRol.getRol({ ci })
        if (rolResutl.error) {
            return res.status(400).json({ mss: rolResutl.error });
        }
        const rol = rolResutl.rol

        // Crear el payload que se almacenará en el token
        const payload = {
            ci: user.ci,
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
            apellido_materno: user.apellido_materno,
            email: user.email,
            telefono: user.telefono,
            rol,
            permisos,
        };

        // Generar el token con el payload que incluye los permisos
        const token = generarToken(payload);
        // Enviar el token en la respuesta
        res.json({
            token
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


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

export const obtenerUsuarios = async (req, res) => {
    try {
        const result = await RepositorioUsuario.getUsuarios()
        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.usuarios)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const obtenerUsuario = async (req, res) => {
    try {
        const { ci } = req.query
        const result = await RepositorioUsuario.getUsuario({ ci })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.usuario)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const obtenerUsuarioToken = async (req, res) => {
    try {
        const ci = req.usuarioCi
        const result = await RepositorioUsuario.getUsuario({ ci })

        if (result.error) {
            return res.status(400).json({ msg: result.error })
        }
        res.json(result.usuario)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Controlador: actualiza los datos del usuario basado en el JSON proporcionado
export const editUsuario = async (req, res) => {
    try {
        const { id, ci, nombre, apellido_paterno, apellido_materno,
            fecha_nacimiento, email, password, rol_id, estado, telefono, genero } = req.body;

        // Validar si el id está presente
        if (!id) {
            return res.status(400).json({ error: "El id del usuario es requerido" });
        }

        // Llamar al repositorio para actualizar el usuario
        const result = await RepositorioUsuario.edit({
            id, ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento,
            email, password, rol_id, estado, telefono, genero
        });

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.json({ message: "Usuario actualizado exitosamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editUserName = async (req, res) => {
    try {
        const { ci, nombre, apellido_paterno, apellido_materno } = req.body
        const result = await RepositorioUsuario.editUserName({ ci, nombre, apellido_paterno, apellido_materno })

        if (!result.usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(result.usuario)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


export const verifyPassword = async (req, res) => {
    try {
        const { ci, password } = req.body
        const result = await RepositorioUsuario.verifyPassword({ ci, password })

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.json({ msg: result.msg })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const editUserPassword = async (req, res) => {
    try {
        const { ci, newPassword } = req.body
        const result = await RepositorioUsuario.editUserPassword({ ci, newPassword })
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.json({ msg: result.msg })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


