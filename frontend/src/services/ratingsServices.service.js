// Este es el servicio secundario... 

import axios from "axios";
const baseURL = 'http://localhost:3001/api/ratings';


// GET - NUEVO REGISTRO (sin el .data)

const getAllRatingsRegistro = async () => {
    try{
        const respuesta = await axios.get(`${baseURL}`);
        return respuesta;
    } catch ( error ) { console.log("Error: " + error)}
}

// GET - PARA CONSULTAR (con el .data)

const getAllRatingsConsulta = async () => {
    try{
        const respuesta = await axios.get(`${baseURL}`);
        return respuesta.data;
    } catch ( error ) { console.log("Error: " + error)}
}


const ratingsServices = { getAllRatingsRegistro, getAllRatingsConsulta };

export default ratingsServices;
