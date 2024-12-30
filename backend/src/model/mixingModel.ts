import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";


const mixingModel = sequelize.define('mixingModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    FromLotNo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Fromorigin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ToLotNo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Toorigin: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Section: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    amountBeforeBacklog: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    amountAfterBacklog: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
export default mixingModel;