import express from "express";
import { transformAndExportDataToExcel } from "../services/brokerService.js";

const router = express.Router();

router.post("/convert", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ error: "Datos inválidos o faltantes" });
        }

        const filePath = transformAndExportDataToExcel(data);
        res.json({ success: true, filePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;