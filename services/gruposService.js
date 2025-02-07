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

// Crear un nuevo grupo recibiendo el nombre de la universidad y/o nombre de la regional
export const createGrupo = async ({ nombre, nombreUniversidad, nombreRegional }) => {
    try {
        if (!nombre?.trim()) {
            return { error: "El nombre del grupo no puede estar vacío." };
        }
        if (!nombreUniversidad?.trim() && !nombreRegional?.trim()) {
            return { error: "Debe proporcionarse al menos el nombre de la universidad o de la regional." };
        }

        let universidad = await Universidades.findOne({
            where: {
                [Op.or]: [
                    { nombreUniversidad: nombreUniversidad || null },
                    { nombreRegional: nombreRegional || null }
                ]
            }
        });

        if (!universidad) {
            universidad = await Universidades.create({
                nombreUniversidad: nombreUniversidad || nombreRegional,
                nombreRegional: nombreRegional || nombreUniversidad
            });
        }

        return await Grupos.create({ nombre, idUniversidad: universidad.idUniversidad });
    } catch (error) {
        return { error: error.message };
    }
};

// Crear un grupo con integrantes, recibiendo el nombre de la universidad y/o nombre de la regional
export const crearGrupoConIntegrantes = async ({ nombre, nombreUniversidad, nombreRegional, integrantes }) => {
    try {
        if (!nombre?.trim()) return { error: "El nombre del grupo no puede estar vacío." };
        if (!nombreUniversidad?.trim() && !nombreRegional?.trim()) return { error: "Debe proporcionarse al menos el nombre de la universidad o de la regional." };
        if (!integrantes?.length) return { error: "No se proporcionaron integrantes." };

        let universidad = await Universidades.findOne({
            where: {
                [Op.or]: [
                    { nombreUniversidad: nombreUniversidad || null },
                    { nombreRegional: nombreRegional || null }
                ]
            }
        });

        if (!universidad) {
            universidad = await Universidades.create({
                nombreUniversidad: nombreUniversidad || nombreRegional,
                nombreRegional: nombreRegional || nombreUniversidad
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
