import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const SkuModel = sequelize.define('Sku', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
     
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['sku','section']
            }
        ]
    }
)
export default SkuModel;