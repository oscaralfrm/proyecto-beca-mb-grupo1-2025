import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Inicializar las notificaciones
// toast.configure();

function Conversor() {
  const [file, setFile] = useState(null); // Estado para el archivo
  const [isProcessing, setIsProcessing] = useState(false); // Estado para mostrar "Procesando..."

  //  Capturar el archivo seleccionado
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //  Enviar el archivo al backend
  const handleUpload = async () => {
    if (!file) {
      toast.error("Por favor, selecciona un archivo Excel.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsProcessing(true); // Mostrar "Procesando..."

    try {
      await axios.post("api del backend", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Archivo procesado con éxito.");
    } catch (error) {
      toast.error("Error al subir el archivo.");
    } finally {
      setIsProcessing(false); // Ocultar "Procesando..."
    }
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4 text-success">Convierte Excel a Lista de Integrantes</h1>
      <p className="mb-4 text-muted">
        Sube tu archivo Excel y conviértelo en una lista de integrantes por grupo.
      </p>
      <div className="p-4 bg-light border rounded shadow-sm">
        {!isProcessing ? (
          <>
            <label
              htmlFor="fileUpload"
              className="btn btn-success btn-lg px-5 py-3 mb-3"
            >
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
                {!file 
                ?
                "Arrastra y suelta tu archivo aquí o haz clic en el botón para seleccionarlo."
                :
                "Archivo seleccionado: " + file.name

            }

            </p>

            <button
              onClick={handleUpload}
              className="btn btn-outline-success btn-lg"
              disabled={!file}
            >
              Subir y Procesar
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-success h4 mb-3">Procesando archivo...</p>
            <div
              className="spinner-border text-success"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Conversor;
