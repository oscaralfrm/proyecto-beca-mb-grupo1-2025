import { Op } from "sequelize";
import Universidades from "../models/universidades.js";

// Obtener las primeras 15 universidades ordenadas alfabéticamente
export const getUniversidades = async () => {
    try {
        const universidades = await Universidades.findAll({
            limit: 15,
            order: [["nombreUniversidad", "ASC"]],
        });
        return universidades;
    } catch (error) {
        return { error: error.message };
    }
};

// Obtener una universidad por ID
export const getUniversidadById = async (id) => {
    try {
        const universidad = await Universidades.findByPk(id);
        if (!universidad) {
            return { error: "No se encontró la universidad" };
        }
        return universidad;
    } catch (error) {
        return { error: error.message };
    }
};

// Crear una nueva universidad
export const createUniversidad = async (data) => {
    try {
        const { nombreUniversidad, nombreRegional } = data;

        if (!nombreUniversidad || nombreUniversidad.trim() === "") {
            return { error: "El nombre de la universidad no puede estar vacío." };
        }

        const nuevaUniversidad = await Universidades.create({
            nombreUniversidad,
            nombreRegional,
        });

        return nuevaUniversidad;
    } catch (error) {
        return { error: error.message };
    }
};
