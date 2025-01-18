// Es el main de la aplicación, acá haremos las configuraciones pertinentes...

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbInit from "./data/db-init.js";


// Acá se importan los routers, para cada servicio, de cada modelo...
// Tengo el del ejemplo...
import ejemploRouter from "./routes/ejemploRouter.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

dotenv.config();

const app = express();

// Espacio para los Middlewares... en este caso CORS y JSON.

app
    .use(cors())
    .use(express.json());


// Endpoint de Prueba o de Status

app.get("/api/status", (req, res) => {
    res.json({ respuesta: "API iniciada y escuchando..." });
});

// Uso de cada una de las rutas de los Routers

app
    .use("/api/repositories", repositoryRouter)
    .use("/api/games", gameRouter)
    .use("/api/ratings", ratingRouter)
    .use("/api/genres", genresRouter)
    .use("/api/platforms", platformsRouter);

app
    .use(errorHandler)
    .use(notFound);

async function start() {
    const PORT = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    await dbInit();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}

await start();
