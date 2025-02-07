// Un middleware para manejar errores.

const ERROR_HANDLER = {
    CastError: (res) => res.status(400).send({ error: "El request no tiene el formato correcto" }),

    ValidationError: (res, error) => res.status(400).send({
        error: error.message
    }),

    JsonWebTokenError: (res) => res.status(401).json({ error: "No existe el token o es inválido" }),

    TokenExpiredError: (res) => res.status(401).json({ error: "El token ha expirado" }),

    SequelizeError: (res, error) => res.status(500).send({
        error: error.message
    }),

    defaultError: (res, error) => res.status(500).send({
        error: "Error interno del servidor",
        message: error.message
    })
};

export default (error, request, response, next) => {
    console.log("Error Handler");
    if (process.env.LOG === "true") {
        console.error(error.name, error.message);
    }
    if (error.name && ERROR_HANDLER[error.name]) {
        ERROR_HANDLER[error.name](response, error);
    } else {
        ERROR_HANDLER.defaultError(response, error);
    }
};
