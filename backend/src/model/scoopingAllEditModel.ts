import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnAllEditScooping = sequelize.define('rcnAllEditScooping', {
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
    Opening_Qty:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Receiving_Qty:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    Wholes: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Broken: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Uncut: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Unscoop: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    NonCut: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Rejection: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Dust: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    TotBagCutting: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    KOR: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },


    noOfEmployees: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
 
    noOfLadies:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    noOfGents:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    noOfSupervisors:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    noOfOperators:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'Pending'
    },

    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }


});
export default RcnAllEditScooping;