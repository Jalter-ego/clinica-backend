// especialistasService.js
import pool from "../config/pg.js";

export class RepositorioEspecialistas {
  // Crear relación entre un empleado y varias especialidades
  static async crear({ empleado_id, especialidades }) {
    try {
      // Verificar si el empleado existe
      const {
        rows: [empleadoExistente],
      } = await pool.query("SELECT * FROM empleado WHERE id = $1", [
        empleado_id,
      ]);
      if (!empleadoExistente) {
        return { error: "El empleado no existe" };
      }

      // Eliminar todas las especialidades actuales del empleado (opcional)
      await pool.query("DELETE FROM especialistas WHERE empleado_id = $1", [
        empleado_id,
      ]);

      // Insertar las nuevas especialidades
      for (const especialidad_id of especialidades) {
        // Verificar que la especialidad existe
        const {
          rows: [especialidadExistente],
        } = await pool.query("SELECT * FROM especialidades WHERE id = $1", [
          especialidad_id,
        ]);
        if (!especialidadExistente) {
          return {
            error: `La especialidad con id ${especialidad_id} no existe`,
          };
        }

        // Insertar la nueva relación de especialidad para el empleado
        await pool.query(
          "INSERT INTO especialistas (empleado_id, especialidad_id) VALUES ($1, $2)",
          [empleado_id, especialidad_id]
        );
      }

      // Consultar las especialidades asignadas al empleado para confirmar
      const { rows: especialidadesAsignadas } = await pool.query(
        `
                SELECT 
                    e.id AS especialidad_id, 
                    e.nombre AS especialidad_nombre
                FROM 
                    especialistas es
                JOIN 
                    especialidades e ON es.especialidad_id = e.id
                WHERE 
                    es.empleado_id = $1
            `,
        [empleado_id]
      );

      return {
        empleado_id,
        especialidades: especialidadesAsignadas,
      };
    } catch (err) {
      return { error: err.message };
    }
  }

  // Editar relación de un empleado con nuevas especialidades (similar a crear)
  static async editar({ empleado_id, especialidades }) {
    try {
      // Verificar si el empleado existe
      const {
        rows: [empleadoExistente],
      } = await pool.query("SELECT * FROM empleado WHERE id = $1", [
        empleado_id,
      ]);
      if (!empleadoExistente) {
        return { error: "El empleado no existe" };
      }

      // Eliminar todas las especialidades actuales del empleado
      await pool.query("DELETE FROM especialistas WHERE empleado_id = $1", [
        empleado_id,
      ]);

      // Insertar las nuevas especialidades proporcionadas
      for (const especialidad_id of especialidades) {
        // Verificar que la especialidad existe
        const {
          rows: [especialidadExistente],
        } = await pool.query("SELECT * FROM especialidades WHERE id = $1", [
          especialidad_id,
        ]);
        if (!especialidadExistente) {
          return {
            error: `La especialidad con id ${especialidad_id} no existe`,
          };
        }

        // Insertar la nueva relación
        await pool.query(
          "INSERT INTO especialistas (empleado_id, especialidad_id) VALUES ($1, $2)",
          [empleado_id, especialidad_id]
        );
      }

      // Consultar las especialidades asignadas al empleado para confirmar
      const { rows: especialidadesAsignadas } = await pool.query(
        `
                SELECT 
                    e.id AS especialidad_id, 
                    e.nombre AS especialidad_nombre
                FROM 
                    especialistas es
                JOIN 
                    especialidades e ON es.especialidad_id = e.id
                WHERE 
                    es.empleado_id = $1
            `,
        [empleado_id]
      );

      return {
        empleado_id,
        especialidades: especialidadesAsignadas,
      };
    } catch (err) {
      return { error: err.message };
    }
  }

  // Listar empleados que están en la tabla especialistas con datos de relaciones como objetos anidados
  // static async listar() {
  //   try {
  //     const { rows: empleados } = await pool.query(`
  //               SELECT 
  //                   em.id AS empleado_id,
  //                   em.direccion AS empleado_direccion,
  //                   em.fecha_contratacion AS empleado_fecha_contratacion,
  //                   u.ci AS usuario_ci,
  //                   u.nombre AS usuario_nombre,
  //                   u.apellido_paterno AS usuario_apellido_paterno,
  //                   u.apellido_materno AS usuario_apellido_materno,
  //                   u.fecha_nacimiento AS usuario_fecha_nacimiento,
  //                   u.email AS usuario_email,
  //                   u.telefono AS usuario_telefono,
  //                   u.genero AS usuario_genero,
  //                   r.id AS rol_id,
  //                   r.nombre AS rol_nombre,
  //                   e.id AS especialidad_id,
  //                   e.nombre AS especialidad_nombre,
  //                   e.tiempo_estimado AS especialidad_tiempo_estimado
  //               FROM 
  //                   especialistas es
  //               JOIN 
  //                   empleado em ON es.empleado_id = em.id
  //               JOIN 
  //                   usuarios u ON em.usuario_id = u.id
  //               JOIN 
  //                   especialidades e ON es.especialidad_id = e.id
  //               JOIN 
  //                   roles r ON u.rol_id = r.id
  //           `);

  //     // Transformar los datos para agrupar por empleado y crear objetos anidados
  //     const empleadosMap = {};

  //     empleados.forEach((row) => {
  //       if (!empleadosMap[row.empleado_id]) {
  //         empleadosMap[row.empleado_id] = {
  //           id: row.empleado_id,
  //           direccion: row.empleado_direccion,
  //           fecha_contratacion: row.empleado_fecha_contratacion,
  //           usuario: {
  //             ci: row.usuario_ci,
  //             nombre: row.usuario_nombre,
  //             apellido_paterno: row.usuario_apellido_paterno,
  //             apellido_materno: row.usuario_apellido_materno,
  //             fecha_nacimiento: row.usuario_fecha_nacimiento,
  //             email: row.usuario_email,
  //             telefono: row.usuario_telefono,
  //             genero: row.usuario_genero,
  //             rol: {
  //               id: row.rol_id,
  //               nombre: row.rol_nombre,
  //             },
  //           },
  //           especialidades: [],
  //         };
  //       }

  //       // Agregar la especialidad a la lista de especialidades del empleado
  //       empleadosMap[row.empleado_id].especialidades.push({
  //         id: row.especialidad_id,
  //         nombre: row.especialidad_nombre,
  //         tiempo_estimado: row.especialidad_tiempo_estimado,
  //       });
  //     });

  //     // Convertir el objeto resultante en un array de empleados
  //     const empleadosList = Object.values(empleadosMap);

  //     return { empleados: empleadosList };
  //   } catch (err) {
  //     return { error: err.message };
  //   }
  // }




  static async listar() {
    try {
      const { rows: empleados } = await pool.query(`
        SELECT 
          em.id AS empleado_id,
          em.direccion AS empleado_direccion,
          em.fecha_contratacion AS empleado_fecha_contratacion,
          em.estadoo AS empleado_estadoo,
          u.ci AS usuario_ci,
          u.nombre AS usuario_nombre,
          u.apellido_paterno AS usuario_apellido_paterno,
          u.apellido_materno AS usuario_apellido_materno,
          u.fecha_nacimiento AS usuario_fecha_nacimiento,
          u.email AS usuario_email,
          u.telefono AS usuario_telefono,
          u.genero AS usuario_genero,
          r.id AS rol_id,
          r.nombre AS rol_nombre,
          e.id AS especialidad_id,
          e.nombre AS especialidad_nombre,
          e.tiempo_estimado AS especialidad_tiempo_estimado,
          p.id AS profesion_id,
          p.nombre AS profesion_nombre
        FROM 
          especialistas es
        JOIN 
          empleado em ON es.empleado_id = em.id
        JOIN 
          usuarios u ON em.usuario_id = u.id
        JOIN 
          especialidades e ON es.especialidad_id = e.id
        JOIN 
          roles r ON u.rol_id = r.id
        JOIN 
          profesiones p ON em.profesiones_id = p.id
      `);
  
      // Transformar los datos para agrupar por empleado y crear objetos anidados
      const empleadosMap = {};
  
      empleados.forEach((row) => {
        if (!empleadosMap[row.empleado_id]) {
          empleadosMap[row.empleado_id] = {
            id: row.empleado_id,
            direccion: row.empleado_direccion,
            fecha_contratacion: row.empleado_fecha_contratacion,
            estadoo: row.empleado_estadoo, // Agregar estado del empleado
            usuario: {
              ci: row.usuario_ci,
              nombre: row.usuario_nombre,
              apellido_paterno: row.usuario_apellido_paterno,
              apellido_materno: row.usuario_apellido_materno,
              fecha_nacimiento: row.usuario_fecha_nacimiento,
              email: row.usuario_email,
              telefono: row.usuario_telefono,
              genero: row.usuario_genero,
              rol: {
                id: row.rol_id,
                nombre: row.rol_nombre,
              },
            },
            profesion: {
              id: row.profesion_id, // Agregar ID de la profesión
              nombre: row.profesion_nombre, // Agregar nombre de la profesión
            },
            especialidades: [],
          };
        }
  
        // Agregar la especialidad a la lista de especialidades del empleado
        empleadosMap[row.empleado_id].especialidades.push({
          id: row.especialidad_id,
          nombre: row.especialidad_nombre,
          tiempo_estimado: row.especialidad_tiempo_estimado,
        });
      });
  
      // Convertir el objeto resultante en un array de empleados
      const empleadosList = Object.values(empleadosMap);
  
      return { empleados: empleadosList };
    } catch (err) {
      return { error: err.message };
    }
  }
  


  // Eliminar todas las relaciones de un empleado en la tabla 'especialistas'
  static async eliminar({ empleado_id }) {
    try {
      // Verificar si el empleado tiene alguna relación en la tabla 'especialstas'
      const { rows: relacionesExistentes } = await pool.query(
        "SELECT * FROM especialistas WHERE empleado_id = $1",
        [empleado_id]
      );

      if (relacionesExistentes.length === 0) {
        return { error: "El empleado no tiene especialidades asignadas" };
      }

      // Eliminar todas las relaciones de especialidades para el empleado dado
      await pool.query("DELETE FROM especialistas WHERE empleado_id = $1", [
        empleado_id,
      ]);

      return {
        msg: `Todas las especialidades del empleado con id ${empleado_id} han sido eliminadas correctamente`,
      };
    } catch (err) {
      return { error: err.message };
    }
  }
}
