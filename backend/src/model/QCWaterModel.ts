import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const QCWater = sequelize.define('qcWater', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
   
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: false
    },
    feedph: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    feedtds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    feedhardness: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    boilertype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ph: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },  
    tds: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    night: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wateruse: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    reading: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },    
  
    remarks: 
    {
        type: DataTypes.STRING,
        allowNull: true
    },
  
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'NA'
    },

    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }


    
});
export default QCWater;