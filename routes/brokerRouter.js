import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";
import { transformAndExportDataToExcel } from "../services/brokerService.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/convert", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se ha subido ningún archivo" });
        }

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const outputFilePath = transformAndExportDataToExcel(data);
        fs.unlinkSync(filePath); // Eliminar archivo temporal de entrada

        res.download(outputFilePath, "Integrantes_Convertidos.xlsx", () => {
            fs.unlinkSync(outputFilePath); // Eliminar archivo después de la descarga
        });
    } catch (error) {
        console.error("Error al procesar el archivo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
