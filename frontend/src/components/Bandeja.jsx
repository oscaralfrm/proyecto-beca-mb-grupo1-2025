import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";

const Bandeja = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState([]);
    
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
                
                console.log("Datos extraídos:", jsonData);
                setData(jsonData);
            } catch (error) {
                console.error("Error al procesar el archivo:", error);
            }
        };
        
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container mt-4">
            <h2>Subir Archivo Excel</h2>
            <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
            
            {data.length > 0 && (
                <table className="table mt-4">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, idx) => (
                                    <td key={idx}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Bandeja;
