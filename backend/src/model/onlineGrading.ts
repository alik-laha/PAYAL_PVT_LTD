import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlineGrading = sequelize.define('onlineGrading', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vibratorspeed1: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    vibratorspeed2: {
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

}, {
    indexes: [
        {
            unique: true,
            fields: ['date']
        }
    ]
})
export default OnlineGrading;