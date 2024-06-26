import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const Asset = sequelize.define('asset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    machineID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    machineName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primaryAsset: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },

    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    indexes: [
        {
            unique: true,
            fields: ['machineID','section']
        }
    ]
})
export default Asset;