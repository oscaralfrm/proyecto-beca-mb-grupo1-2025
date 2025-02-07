import sequelize from "../data/db.js";
import DataTypes from "sequelize";

const Universidades = sequelize.define("Universidades", {
    idUniversidad: { 
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER, 
        field: "ID_UNIVERSIDAD" 
    },
    nombreUniversidad: { 
        type: DataTypes.STRING(100), 
        field: "NOMBRE_UNIVERSIDAD" 
    }, 
    nombreRegional: { 
        type: DataTypes.STRING(100), 
        field: "NOMBRE_REGIONAL" 
    }
}, { 
    timestamps: false, 
    tableName: "UNIVERSIDADES" 
});

export default Universidades;