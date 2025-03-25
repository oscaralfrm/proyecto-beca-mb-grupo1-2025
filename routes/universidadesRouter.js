// routes/UniversidadesRoutes.js
import express from "express";
import * as svcUniversidades from "../services/universidadService.js";

const universidadRouter = express.Router();

// Obtener todas las universidades
universidadRouter.get("/", async (req, res) => {
    try {
        const universidades = await svcUniversidades.getUniversidades();
        res.json(universidades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una universidad por ID
universidadRouter.get("/:id", async (req, res) => {
    try {
        const universidad = await svcUniversidades.getUniversidadById(req.params.id);
        if (universidad.error) {
            res.status(404).json(universidad);
        } else {
            res.json(universidad);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva universidad
universidadRouter.post("/", async (req, res) => {
    try {
        const nuevaUniversidad = await svcUniversidades.createUniversidad(req.body);
        if (nuevaUniversidad.error) {
            res.status(400).json(nuevaUniversidad);
        } else {
            res.status(201).json(nuevaUniversidad);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default universidadRouter;
