import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Bandeja = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo Excel.");
      return;
    }

    setIsProcessing(true);

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
        toast.success("Archivo cargado correctamente.");
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
        toast.error("Error al procesar el archivo.");
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4 text-success">Cargar Archivo Excel</h1>
      <p className="mb-4 text-muted">Selecciona y visualiza los datos de tu archivo Excel.</p>
      
      <div className="p-4 bg-light border rounded shadow-sm">
        {!isProcessing ? (
          <>
            <label htmlFor="fileUpload" className="btn btn-success btn-lg px-5 py-3 mb-3">
              Seleccionar archivo Excel
            </label>
            <input
              id="fileUpload"
              type="file"
              accept=".xlsx,.xlsm,.xls,.csv,.ods"
              onChange={handleFileChange}
              className="d-none"
            />
            <p className="text-muted">
              {!file ? "Arrastra y suelta tu archivo aquí o haz clic en el botón para seleccionarlo." : "Archivo seleccionado: " + file.name}
            </p>

            <button onClick={handleUpload} className="btn btn-outline-success btn-lg" disabled={!file}>
              Subir y Visualizar
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

      {data.length > 0 && (
        <div className="table-responsive mt-4 p-3 bg-white shadow rounded">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-success">
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
        </div>
      )}
    </div>
  );
};

export default Bandeja;
