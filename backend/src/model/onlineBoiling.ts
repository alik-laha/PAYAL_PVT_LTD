import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlineBoiling = sequelize.define('onlineBoiling', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cookerNo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cookerPressure: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cookerTime: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cashewStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
       
    },
    cleaningStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cleanRemarks: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maintainance: {
        type: DataTypes.STRING,
        allowNull: false
    },
   maintainanceRemarks: {
        type: DataTypes.STRING,
        allowNull: false
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
            fields: ['date']
        }
    ]
})
export default OnlineBoiling;