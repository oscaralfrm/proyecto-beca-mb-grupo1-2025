// routes/GruposRoutes.js
import express from "express";
import * as svcGrupos from "../services/grupos-service.js";
import multer from "multer";
import * as XLSX from "xlsx";
import fs from "fs";
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



const upload = multer({ dest: "uploads/" });

gruposRouter.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No se envió ningún archivo." });

        // Leer el archivo Excel
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });

        // Extraer grupos e integrantes desde el archivo
        const grupos = {};
        jsonData.forEach((row) => {
            const { Grupo, Nombre, DNI, Email, Universidad, Regional } = row;

            if (!grupos[Grupo]) {
                grupos[Grupo] = {
                    nombre: Grupo,
                    nombreUniversidad: Universidad,
                    nombreRegional: Regional,
                    integrantes: [],
                };
            }

            grupos[Grupo].integrantes.push({
                nombre: Nombre,
                dni: DNI,
                mail: Email,
            });
        });

        // Registrar los grupos en la base de datos
        for (const grupo of Object.values(grupos)) {
            await svcGrupos.crearGrupoConIntegrantes(grupo);
        }

        // Convertir los datos en un nuevo archivo Excel
        const newWorkbook = XLSX.utils.book_new();
        const newSheet = XLSX.utils.json_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Integrantes Convertidos");

        const outputPath = `uploads/Integrantes_Convertidos.xlsx`;
        XLSX.writeFile(newWorkbook, outputPath);

        // Enviar el archivo al frontend
        res.download(outputPath, "Integrantes_Convertidos.xlsx", () => {
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputPath);
        });
    } catch (error) {
        console.error("Error al procesar el archivo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});



export default gruposRouter;
