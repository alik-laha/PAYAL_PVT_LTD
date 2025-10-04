import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlineBoiler = sequelize.define('onlineBoiler', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    boiler1pressure: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    boiler2pressure: {
        type: DataTypes.DECIMAL(10,2),
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


})
export default OnlineBoiler;