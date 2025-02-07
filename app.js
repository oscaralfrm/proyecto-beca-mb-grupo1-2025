import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbInit from "./data/db-init.js";

// Importar routers
import integrantesRouter from "./routes/integrantesRouter.js";
import gruposRouter from "./routes/gruposRouter.js";
import universidadesRouter from "./routes/universidadesRouter.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

dotenv.config();

const app = express();

// Middlewares
app
    .use(cors())
    .use(express.json());

// Endpoint de Prueba o de Status
app.get("/api/status", (req, res) => {
    res.json({ respuesta: "API iniciada y escuchando..." });
});

// Uso de cada una de las rutas de los Routers
app
    .use("/api/integrantes", integrantesRouter)
    .use("/api/grupos", gruposRouter)
    .use("/api/universidades", universidadesRouter);

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
