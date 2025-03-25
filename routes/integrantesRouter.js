// routes/IntegrantesRoutes.js
import express from "express";
import * as svcIntegrantes from "../services/IntegrantesService.js";

const integrantesRouter = express.Router();

// Obtener todos los integrantes
integrantesRouter.get("/", async (req, res) => {
    try {
        const integrantes = await svcIntegrantes.getIntegrantes();
        res.json(integrantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un integrante por ID
integrantesRouter.get("/:id", async (req, res) => {
    try {
        const integrante = await svcIntegrantes.getIntegranteById(req.params.id);
        if (integrante.error) {
            res.status(404).json(integrante);
        } else {
            res.json(integrante);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo integrante
integrantesRouter.post("/", async (req, res) => {
    try {
        const nuevoIntegrante = await svcIntegrantes.createIntegrante(req.body);
        if (nuevoIntegrante.error) {
            res.status(400).json(nuevoIntegrante);
        } else {
            res.status(201).json(nuevoIntegrante);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default integrantesRouter;
