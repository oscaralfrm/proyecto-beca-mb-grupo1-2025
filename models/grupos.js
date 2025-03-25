import sequelize from "../data/db.js";
import DataTypes from "sequelize";
import Universidades from "./universidades.js";

const Grupos = sequelize.define("Grupos", {
    idGrupo: { 
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER, 
        field: "ID_GRUPO" 
    },
    nombre: { 
        type: DataTypes.STRING(100), 
        field: "NOMBRE_GRUPO" 
    }, 
    idUniversidad: { 
        type: DataTypes.INTEGER, 
        field: "ID_UNIVERSIDAD",
        references: {
            model: Universidades,
            key: "ID_UNIVERSIDAD"
        }
    }
}, { 
    timestamps: false, 
    tableName: "GRUPOS" 
});

// Relación con Universidades
Universidades.hasMany(Grupos, { foreignKey: "ID_UNIVERSIDAD" });
Grupos.belongsTo(Universidades, { foreignKey: "ID_UNIVERSIDAD" });

export default Grupos;
