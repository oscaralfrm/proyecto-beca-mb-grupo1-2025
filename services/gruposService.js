import { Op } from "sequelize";
import Universidades from "../models/universidades.js";
import Integrantes from "../models/integrantes.js";
import Grupos from "../models/grupos.js";


// Obtener los primeros 15 grupos ordenados por nombre
export const getGrupos = async () => {
    try {
        const grupos = await Grupos.findAll({
            limit: 15,
            order: [["nombre", "ASC"]],
        });
        return grupos;
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
        if (!grupo) {
            return { error: "No se encontró el grupo" };
        }
        return grupo;
    } catch (error) {
        return { error: error.message };
    }
};

// Crear un nuevo grupo
export const createGrupo = async (data) => {
    try {
        const { nombre, idUniversidad } = data;

        if (!nombre || nombre.trim() === "") {
            return { error: "El nombre del grupo no puede estar vacío." };
        }

        const universidadExiste = await Universidades.findByPk(idUniversidad);
        if (!universidadExiste) {
            return { error: "La universidad proporcionada no existe." };
        }

        const nuevoGrupo = await Grupos.create({
            nombre,
            idUniversidad,
        });

        return nuevoGrupo;
    } catch (error) {
        return { error: error.message };
    }
};

// Éste es el método MÁS importante, porque es el que guarda en la BBDD los grupos según las tutoras los van guardando...

export const crearGrupoConIntegrantes = async (data) => {
    const { nombre, idUniversidad, integrantes } = data;

    // Verificar si los datos están llegando correctamente
    console.log('Datos recibidos:', data);

    // Verificar si la universidad existe
    let universidad = await Universidades.findOne({
        where: { ID_UNIVERSIDAD: idUniversidad }
    });

    // Si no existe, crear la universidad con el nombre de la regional
    if (!universidad) {
        console.log('La universidad no existe. Se creará una nueva.');
        universidad = await Universidades.create({
            NOMBRE_UNIVERSIDAD: 'Universidad ' + nombre, // Asignando nombre de universidad (puedes personalizarlo)
            NOMBRE_REGIONAL: nombre // Usar el nombre de la regional
        });
    } else {
        console.log('Universidad encontrada:', universidad);
    }

    // Crear el grupo con el ID de la universidad correctamente asignado
    const grupo = await Grupos.create({
        NOMBRE_GRUPO: nombre,
        ID_UNIVERSIDAD: universidad.ID_UNIVERSIDAD // Asignando correctamente el ID de la universidad
    });

    console.log('Grupo creado:', grupo);

    // Verificar si los integrantes están presentes
    if (!integrantes || integrantes.length === 0) {
        return { error: 'No se proporcionaron integrantes.' };
    }

    // Crear los integrantes y asociarlos correctamente al grupo
    const integrantesPromises = integrantes.map(integrante => {
        console.log('Creando integrante:', integrante);
        return Integrantes.create({
            NOMBRE_INTEGRANTE: integrante.nombre,
            DNI_INTEGRANTE: integrante.dni,
            MAIL_INTEGRANTE: integrante.mail,
            ID_GRUPO: grupo.ID_GRUPO // Relacionar el integrante con el grupo
        });
    });

    // Esperar la creación de todos los integrantes
    await Promise.all(integrantesPromises);

    // Retornar la información del grupo, universidad e integrantes
    return {
        grupo,
        universidad,
        integrantes
    };
};
