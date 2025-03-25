// Un middleware para mostrar un mensaje de error 404 si no encuentran el endpoint.

const notFound = (req, res) => {
    res.status(404).json({
        error: (`Not Found [${req.path}]`),
    });
};

export default notFound;
