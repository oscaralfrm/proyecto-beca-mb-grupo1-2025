// Acá configuramos la conexión con la Base de Datos... es decir, es el que configura el objeto sequelize.

import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config(); // Importante leer las notas del método .config(); TOMA la configuración que tenemos en el archivo .env

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite" // Acá tenemos que poner la dirección relativa de donde se encuentra nuestra Base de Datos, usamos SQLite...
});

export default sequelize;
