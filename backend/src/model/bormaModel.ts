import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnBorma = sequelize.define('rcnBorma', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    LotNo:{
        type: DataTypes.STRING,
        allowNull: false
        
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    InputWholes: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    InputPieces: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    TotalInput: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    noOfOperators:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otherTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
   

    NoOfTrolley: 
    {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    InputMoisture: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    OutputMoisture: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    OutputWholes: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    OutputPieces: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    TotalOutput: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    BormaLoss: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    BormaStatus: 
    {
        type: DataTypes.DECIMAL(10,2),
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
export default RcnBorma;