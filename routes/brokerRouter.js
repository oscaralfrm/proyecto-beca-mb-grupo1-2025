import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";

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

        const transformedData = data.map(row => ({
            Regional: row["regional"] || "",
            Grupo: row["nombre de grupo"] || "",
            Nombre: row["nombre integrante1"] || "",
            DNI: row["dni int 1"] || "",
            Mail: row["mail integrante1"] || "",
        }));

        const newWorkbook = xlsx.utils.book_new();
        const newWorksheet = xlsx.utils.json_to_sheet(transformedData);
        xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "Integrantes");

        const outputFilePath = `uploads/output_${Date.now()}.xlsx`;
        xlsx.writeFile(newWorkbook, outputFilePath);

        fs.unlinkSync(filePath); // Eliminar archivo temporal

        res.download(outputFilePath, "Integrantes_Convertidos.xlsx", () => {
            fs.unlinkSync(outputFilePath); // Eliminar el archivo después de la descarga
        });
    } catch (error) {
        console.error("Error al procesar el archivo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
