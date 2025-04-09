// Este es el servicio principal... hacer la mayoría de métodos aquí...

import axios from "axios";
const baseURL = 'http://localhost:3001/api/games';

// GET - ALL
const getAllGames = async () => {
    const respuesta = await axios.get(`${baseURL}`);
    return respuesta.data;
}

// GET - BY ID
const getGameById = async (gameId) => {
    try {
        const res = await axios.get(`${baseURL}/${gameId}`);
        return res.data;
    } catch (error) {
        console.error("Error:", error);
    }
};
// GET con FILTRO
const getGamesByFilter = async (filterText, ratingFilter) => {
    try {
        const params = {};
        if (filterText.trim()) {
            params.textFilter = filterText;
        }
        if (ratingFilter.trim()) {
            params.ratingFilter = ratingFilter;
        }
        const response = await axios.get(`${baseURL}`, { params });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

// POST
const postNuevoJuego = async (game) => {
    const respuesta = await axios.post(`${baseURL}`, game);
    return respuesta.data;
}

// DELETE
const deleteGamePorId = async (gameId) => {
    const respuesta = await axios.delete(`${baseURL}/${gameId}`);
    return respuesta.data;
}

// UPDATE (PUT)
const updateGame = async (gameId, datosGame) => {
    try {
        const respuesta = await axios.put(`${baseURL}/${gameId}`, datosGame);
        return respuesta.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// PATCH
const patchGame = async (gameId, datosParciales) => {
    try {
        const respuesta = await axios.patch(`${baseURL}/${gameId}`, datosParciales);
        return respuesta.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}


const gamesServices = { getAllGames, getGameById, postNuevoJuego, deleteGamePorId, updateGame, getGamesByFilter, patchGame };

export default gamesServices;