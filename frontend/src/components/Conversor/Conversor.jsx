import { useState } from "react";
import { uploadAndConvertFile } from "../../services/brokerService.js";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Conversor() {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [convertedData, setConvertedData] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Por favor, selecciona un archivo Excel.");
            return;
        }

        setIsProcessing(true);

        try {
            const convertedFile = await uploadAndConvertFile(file);
            const url = window.URL.createObjectURL(new Blob([convertedFile], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Integrantes_Convertidos.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Archivo convertido y descargado con éxito.");

            // Leer y mostrar los datos del archivo convertido
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
                    setConvertedData(jsonData);
                } catch (error) {
                    console.error("Error al procesar el archivo convertido:", error);
                    toast.error("Error al mostrar el archivo convertido.");
                }
            };
            reader.readAsArrayBuffer(convertedFile);
        } catch (error) {
            toast.error("Error al procesar el archivo.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container text-center my-5">
            <h1 className="mb-4 text-success">Convierte Excel a Lista de Integrantes</h1>
            <p className="mb-4 text-muted">Sube tu archivo Excel y conviértelo en una lista de integrantes por grupo.</p>
            <div className="p-4 bg-light border rounded shadow-sm">
                {!isProcessing ? (
                    <>
                        <label htmlFor="fileUpload" className="btn btn-success btn-lg px-5 py-3 mb-3">
                            Seleccionar archivo Excel
                        </label>
                        <input id="fileUpload" type="file" accept=".xlsx,.xlsm,.xls,.csv,.ods" onChange={handleFileChange} className="d-none" />
                        <p className="text-muted">{!file ? "Selecciona un archivo..." : `Archivo seleccionado: ${file.name}`}</p>

                        <button onClick={handleUpload} className="btn btn-outline-success btn-lg" disabled={!file}>
                            Subir y Procesar
                        </button>
                    </>
                ) : (
                    <div className="text-center">
                        <p className="text-success h4 mb-3">Procesando archivo...</p>
                        <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                )}
            </div>

            {convertedData.length > 0 && (
                <div className="table-responsive mt-4 p-3 bg-white shadow rounded">
                    <h2 className="text-success">Vista Previa del Archivo Convertido</h2>
                    <table className="table table-bordered table-hover text-center">
                        <thead className="table-success">
                            <tr>
                                {Object.keys(convertedData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {convertedData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Conversor;
