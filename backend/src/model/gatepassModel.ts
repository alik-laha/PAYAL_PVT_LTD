import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const gatePass = sequelize.define('gatePass', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gatePassNo: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'Created'
       
    }
}, {
        indexes: [
            {
                unique: true,
                fields: ['gatePassNo']
            }
        ]
    })
    export default gatePass;