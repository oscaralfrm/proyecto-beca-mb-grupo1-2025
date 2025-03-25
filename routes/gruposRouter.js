// routes/GruposRoutes.js
import express from "express";
import * as svcGrupos from "../services/gruposService.js";

const gruposRouter = express.Router();

// Obtener todos los grupos
gruposRouter.get("/", async (req, res) => {
    try {
        const grupos = await svcGrupos.getGrupos();
        res.json(grupos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un grupo por ID
gruposRouter.get("/:id", async (req, res) => {
    try {
        const grupo = await svcGrupos.getGrupoById(req.params.id);
        if (grupo.error) {
            res.status(404).json(grupo);
        } else {
            res.json(grupo);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo grupo con integrantes
gruposRouter.post("/", async (req, res) => {
    try {
        const nuevoGrupo = await svcGrupos.crearGrupoConIntegrantes(req.body);
        if (nuevoGrupo.error) {
            res.status(400).json(nuevoGrupo);
        } else {
            res.status(201).json(nuevoGrupo);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default gruposRouter;
