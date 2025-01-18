// Un middleware para mostrar un mensaje de error.

const ERROR_HANDLER = {
    CastError: (res) => res.status(400).send({ error: "el request no tiene el formato correcto" }),

    ValidationError: (res, error) => res.status(400).send({
        error: error.message
    }),

    JsonWebTokenError: (res) => res.status(401).json({ error: "no existe el token o es inválido" }),

    TokenExpirerError: (res) => res.status(401).json({ error: "el token ha expirado" }),

    SequelizeError: (res, error) => res.status(500).send({
        error: error.message
    }),
};

export default (error, request, response, next) => {
    console.log("Error Handler");
    if (process.env.LOG === "true") {
        console.error(error.name);
    }
    if (error.name) {
        const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError;
        handler(response, error);
    }
    else {
        next();
    }
};
