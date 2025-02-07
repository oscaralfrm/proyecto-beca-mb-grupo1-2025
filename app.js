import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbInit from "./data/db-init.js";

// Importar routers
import integrantesRouter from "./routes/integrantesRouter.js";
import gruposRouter from "./routes/gruposRouter.js";
import universidadesRouter from "./routes/universidadesRouter.js";
import brokerRouter from "./routes/brokerRouter.js";

// Importar middlewares
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Manejo de errores al parsear JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "JSON mal formado" });
    }
    next(err);
});

// Endpoint de prueba o de status
app.get("/api/status", (req, res) => {
    res.json({ respuesta: "API iniciada y escuchando..." });
});

// Uso de cada una de las rutas de los Routers
app.use("/api/integrantes", integrantesRouter);
app.use("/api/grupos", gruposRouter);
app.use("/api/universidades", universidadesRouter);
app.use("/api/broker", brokerRouter);

// Middleware para rutas no encontradas (debe ir antes del errorHandler)
app.use(notFound);

// Middleware de manejo de errores generales
app.use(errorHandler);

// Función para iniciar el servidor
async function start() {
    try {
        const PORT = process.env.PORT || 3000;

        // Inicializar la conexión a la base de datos
        await dbInit();

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
        process.exit(1); // Salir con código de error
    }
}

await start();
