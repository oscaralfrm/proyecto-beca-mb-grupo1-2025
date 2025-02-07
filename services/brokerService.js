// services/brokerService.js
import xlsx from "xlsx";
import fs from "fs";

export function transformAndExportDataToExcel(data) {
    try {
        const transformedData = data.map(row => {
            return {
                Regional: row["regional"],
                Grupo: row["nombre de grupo"],
                Nombre: row["nombre integrante1"],
                DNI: row["dni int 1"],
                Mail: row["mail integrante1"],
            };
        });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(transformedData);
        xlsx.utils.book_append_sheet(wb, ws, "Integrantes");

        const filePath = `./uploads/output_${Date.now()}.xlsx`;
        xlsx.writeFile(wb, filePath);
        return filePath;
    } catch (error) {
        console.error("Error al transformar y exportar los datos:", error);
        throw error;
    }
}
