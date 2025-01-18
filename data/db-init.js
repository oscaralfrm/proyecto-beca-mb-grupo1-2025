// Acá vamos a hacer la instancia del conector de la Base de Datos...

// Import sequelize
import sequelize from "./db.js"; // Estamos importando el objeto sequelize que configuramos en db.js

// Función para sincronizar los modelos con la base de datos
async function dbInit() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();
        console.log("Modelos sincronizados con la base de datos");
    }
    catch (error) {
        console.error("Error al sincronizar modelos:", error);
    }
}

export default dbInit; // dbInit es nuestro objeto de conexión con la base de datos, tiene Singleton por debajo.
