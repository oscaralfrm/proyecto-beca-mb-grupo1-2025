import { Op } from "sequelize";
import Universidades from "../models/universidades.js";
import Integrantes from "../models/integrantes.js";
import Grupos from "../models/grupos.js";

// Obtener los primeros 15 grupos ordenados por nombre
export const getGrupos = async () => {
    try {
        return await Grupos.findAll({
            limit: 15,
            order: [["nombre", "ASC"]],
        });
    } catch (error) {
        return { error: error.message };
    }
};

// Obtener un grupo por ID
export const getGrupoById = async (id) => {
    try {
        const grupo = await Grupos.findByPk(id, {
            include: { model: Universidades },
        });
        return grupo || { error: "No se encontró el grupo" };
    } catch (error) {
        return { error: error.message };
    }
};

// Crear un nuevo grupo
export const createGrupo = async ({ nombre, idUniversidad }) => {
    try {
        if (!nombre?.trim()) {
            return { error: "El nombre del grupo no puede estar vacío." };
        }

        const universidad = await Universidades.findByPk(idUniversidad);
        if (!universidad) {
            return { error: "La universidad proporcionada no existe." };
        }

        return await Grupos.create({ nombre, idUniversidad });
    } catch (error) {
        return { error: error.message };
    }
};

// Crear un grupo con integrantes
export const crearGrupoConIntegrantes = async ({ nombre, idUniversidad, integrantes }) => {
    try {
        if (!nombre?.trim()) return { error: "El nombre del grupo no puede estar vacío." };
        if (!integrantes?.length) return { error: "No se proporcionaron integrantes." };

        let universidad = await Universidades.findByPk(idUniversidad);

        if (!universidad) {
            universidad = await Universidades.create({
                nombreUniversidad: `Universidad ${nombre}`,
                nombreRegional: nombre,
            });
        }

        const grupo = await Grupos.create({
            nombre,
            idUniversidad: universidad.idUniversidad,
        });

        const integrantesPromises = integrantes.map(({ nombre, dni, mail }) =>
            Integrantes.create({
                nombre,
                dni,
                mail,
                idGrupo: grupo.idGrupo,
            })
        );

        await Promise.all(integrantesPromises);

        return { grupo, universidad, integrantes };
    } catch (error) {
        return { error: error.message };
    }
};
