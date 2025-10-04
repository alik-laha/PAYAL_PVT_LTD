import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlineScooping = sequelize.define('onlineScooping', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    oilcontainStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chalnacontainStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cashewHuskprcnt: {
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
export default OnlineScooping;