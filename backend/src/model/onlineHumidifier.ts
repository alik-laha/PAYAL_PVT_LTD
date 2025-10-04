import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlineHumidifier = sequelize.define('onlineHumidifier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pressure: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    LotNo: {
         type: DataTypes.STRING,
        allowNull: false
    },
 
    Origin: {
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


})
export default OnlineHumidifier;