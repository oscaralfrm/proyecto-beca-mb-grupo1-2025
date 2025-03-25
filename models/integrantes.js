import sequelize from "../data/db.js";
import DataTypes from "sequelize";
import Grupos from "./grupos.js";

const Integrantes = sequelize.define("Integrantes", {
    idIntegrante: { 
        primaryKey: true, 
        autoIncrement: true,
        type: DataTypes.INTEGER, 
        field: "ID_INTEGRANTE" 
    },
    nombre: { 
        type: DataTypes.STRING(100), 
        field: "NOMBRE_INTEGRANTE" 
    }, 
    dni: { 
        type: DataTypes.INTEGER, 
        field: "DNI_INTEGRANTE" 
    }, 
    mail: { 
        type: DataTypes.STRING(100), 
        field: "MAIL_INTEGRANTE" 
    }, 
    idGrupo: { 
        type: DataTypes.INTEGER, 
        field: "ID_GRUPO",
        references: {
            model: Grupos,
            key: "ID_GRUPO"
        }
    }
}, { 
    timestamps: false, 
    tableName: "INTEGRANTES" 
});

// Relación con Grupos
Grupos.hasMany(Integrantes, { foreignKey: "ID_GRUPO" });
Integrantes.belongsTo(Grupos, { foreignKey: "ID_GRUPO" });

export default Integrantes;
