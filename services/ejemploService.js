import { Op } from "sequelize"; // Para operadores de Sequelize
import validator from "validator"; // Para validar la URL
// import Ejemplo from "../models/ejemplo.js";

// TODO ESTO ES UN PLACEHOLDER, PARA CUANDO COMENCEMOS A TRABAJAR, TENERLO DE GUÍA Y DE REFERENCIA...


// Función para obtener los primeros 15 ejemplos ordenados por fecha de actualización
export const getEjemplos = async () => {
    try {
        const ejemplos = await Ejemplo.findAll({
            limit: 15,
            order: [["metacritic", "DESC"]],
        });
        return ejemplos;
    }
    catch (error) {
        return { error: error.message };
    }
};

// Función para obtener un ejemplo por ID
export const getEjemploById = async (id) => {
    try {
        const ejemplo = await Ejemplo.findByPk(id);
        if (!ejemplo) {
            return { error: "No se encontró el ejemplo" };
        }
        return game;
    }
    catch (error) {
        return { error: error.message };
    }
};

// Función para obtener ejemplos por filtro... servirá más adelante para cuando tengamos que hacer filtros en el Sheets y después pasarlos a otro Excel.
export const getGamesByFilter = async (textFilter, ratingFilter, genresFilter, platformsFilter) => {
    try {
        const filterConditions = [];

        if (textFilter) {
            filterConditions.push({
                [Op.or]: [
                    { name: { [Op.like]: `%${textFilter}%` } },
                    { developers: { [Op.like]: `%${textFilter}%` } },
                    { publishers: { [Op.like]: `%${textFilter}%` } },
                ],
            });
        }

        if (ratingFilter) {
            filterConditions.push({ esrbRating: ratingFilter });
        }

        if (genresFilter) {
            filterConditions.push({ genres: { [Op.like]: `%${genresFilter}%` } });
        }

        if (platformsFilter) {
            filterConditions.push({ platforms: { [Op.like]: `%${platformsFilter}%` } });
        }

        // Verificamos que al menos un filtro esté presente
        if (filterConditions.length === 0) {
            return { error: "At least one filter parameter must be provided." };
        }

        // Consulta a la base de datos con las condiciones de filtro
        const games = await Game.findAll({
            where: {
                [Op.and]: filterConditions,
            },
            order: [["metacritic", "DESC"]],
        });
        return games;
    }
    catch (error) {
        return { error: error.message };
    }
};

// Función para crear un nuevo repositorio
export const createGame = async (data) => {
    try {
        // eslint-disable-next-line max-len
        const { slug, name, website, metacritic, released, playTime, raters, platforms, developers, genres, publishers, esrbRating } = data;

        // Validar que `slug` no se repita
        const existingGame = await Game.findOne({ where: { slug } });
        if (existingGame) {
            return { error: "El slug ya existe en la tabla." };
        }

        // Validar que `name` no esté vacío
        if (!name || name.trim() === "") {
            return { error: "El nombre no puede estar vacío." };
        }

        // Validar que `website` sea una URL válida
        if (website && !validator.isURL(website)) {
            return { error: "La URL del sitio web no es válida." };
        }

        // Obtener los valores válidos de ESRB
        const validEsrbRatings = await getAllEsrbRatings();
        if (esrbRating && !validEsrbRatings.includes(esrbRating)) {
            return { error: "El valor de ESRB Rating no es válido." };
        }

        // Crear el nuevo juego
        const newGame = await Game.create({
            slug,
            name,
            metacritic,
            released,
            updated: Date.now(), // Fecha actual en milisegundos
            website,
            playTime,
            raters,
            platforms,
            developers,
            genres,
            publishers,
            esrbRating
        });

        return newGame;
    }
    catch (error) {
        return { error: error.message };
    }
};

// Usé como plantilla para los servicios un ejercicio que hice en DDS, posteriormente lo cambiaremos para que corresponda con lo que debemos hacer en la aplicación...
