import { Op } from "sequelize";
import Integrantes from "../models/integrantes.js";
import Grupos from "../models/grupos.js";

// Obtener los primeros 15 integrantes ordenados alfabéticamente
export const getIntegrantes = async () => {
    try {
        const integrantes = await Integrantes.findAll({
            limit: 15,
            order: [["nombre", "ASC"]],
        });
        return integrantes;
    } catch (error) {
        return { error: error.message };
    }
};

// Obtener un integrante por ID
export const getIntegranteById = async (id) => {
    try {
        const integrante = await Integrantes.findByPk(id, {
            include: { model: Grupos },
        });
        if (!integrante) {
            return { error: "No se encontró el integrante" };
        }
        return integrante;
    } catch (error) {
        return { error: error.message };
    }
};

// Crear un nuevo integrante
export const createIntegrante = async (data) => {
    try {
        const { nombre, dni, mail, idGrupo } = data;

        if (!nombre || nombre.trim() === "") {
            return { error: "El nombre del integrante no puede estar vacío." };
        }

        const grupoExiste = await Grupos.findByPk(idGrupo);
        if (!grupoExiste) {
            return { error: "El grupo proporcionado no existe." };
        }

        const nuevoIntegrante = await Integrantes.create({
            nombre,
            dni,
            mail,
            idGrupo,
        });

        return nuevoIntegrante;
    } catch (error) {
        return { error: error.message };
    }
};
