import axios from "axios";

export async function uploadAndConvertFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post("http://localhost:3001/api/broker/convert", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            responseType: "blob",
        });

        return response.data;
    } catch (error) {
        console.error("Error al procesar el archivo:", error.response?.data || error.message);
        throw error;
    }
}
