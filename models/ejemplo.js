import sequelize from "../data/db.js"; // Importamos el objeto configurado de sequelize... NO confundir con db-init.js que ese lo usamos en app.js
import DataTypes from "sequelize"; // Importamos la biblioteca DataTypes de Sequelize (la biblioteca, no el objeto) para definir los tipos...

// TODO ESTO ES UN PLACEHOLDER, PARA CUANDO COMENCEMOS A TRABAJAR, TENERLO DE GUÍA Y DE REFERENCIA...


const Ejemplos = sequelize.define("Nombre_Exacto_Tabla_En_La_Base_De_Datos",{

    ejemploId: { primaryKey: true, type: DataTypes.INTEGER, field: "NOMBRE_CAMPO_EXACTO_ID_BASE_DE_DATOS" },
    nombreAlumno : { type: DataTypes.STRING(100), field: "NOMBRE_CAMPO_EXACTO_NOMBRE_ALUMNO_BASE_DE_DATOS" }, 
},
{ "timestamps": false, "tableName": "Nombre_Exacto_Tabla_En_La_Base_De_Datos"}) // Siempre tenemos que poner ésto, cuando definimos un modelo en Sequelize

export default Ejemplos;

// Tenemos que utilizar un MODELO, porque en la Base de Datos está con un modelo de datos distinto y con Node.js usamos JSON, son dos modelos de datos distintos!!!