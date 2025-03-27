import xlsx from "xlsx";
import fs from "fs";

export function transformAndExportDataToExcel(data) {
    try {
        const transformedData = [];

        data.forEach(row => {
            const regional = row["regional"] || "";
            const grupo = row["nombre de grupo"] || "";

            for (let i = 1; i <= 10; i++) {
                const nombre = row[`nombre integrante${i}`]?.trim();
                const dni = row[`dni int ${i}`]?.trim();
                const mail = row[`mail integrante${i}`]?.trim();

                if (nombre) {
                    transformedData.push({
                        Regional: regional,
                        Grupo: grupo,
                        Nombre: nombre,
                        DNI: dni || "",
                        Mail: mail || "",
                    });
                }
            }
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

export const uploadAndConvertFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3001/api/broker/convert", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Error al procesar el archivo.");
    }

    return await response.json(); // Ahora el backend devolverá un JSON con el archivo y los datos procesados
};
