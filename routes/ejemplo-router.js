import express from "express"; // Importamos el objeto express, que usa por debajo el patrón Façade y con ésto tenemos funcionalidades para operar los servicios.
import * as svcEjemplo from "../services/ejemplo-service.js";

const router = express.Router();

// TODO ESTO ES UN PLACEHOLDER, PARA CUANDO COMENCEMOS A TRABAJAR, TENERLO DE GUÍA Y DE REFERENCIA...

// Endpoint para obtener "ejemplos"

router.get("/", async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            const games = await svcGames.getGames();
            res.json(games);
        }
        else {
            const { textFilter, ratingFilter, genresFilter, platformsFilter } = req.query;

            // eslint-disable-next-line max-len
            const games = await svcGames.getGamesByFilter(textFilter, ratingFilter, genresFilter, platformsFilter);
            res.json(games);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un juego por ID
router.get("/:id", async (req, res) => {
    try {
        const game = await svcGames.getGameById(req.params.id);
        if (game.error) {
            res.status(404).json(game);
        }
        else {
            res.json(game);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear un nuevo juego
router.post("/", async (req, res) => {
    try {
        const newGame = await svcGames.createGame(req.body);
        if (newGame.error) {
            res.status(400).json(newGame);
        }
        else {
            res.status(201).json(newGame);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
