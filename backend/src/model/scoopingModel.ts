import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnScooping = sequelize.define('rcnScooping', {
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
    SizeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Size: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Scooping_Line_Mc:
    {
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
    KOR: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Trolley_Broken: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Trolley_Small_JB: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    scoopStatus:{
        type:DataTypes.INTEGER,
        defaultValue: 0
    },

    
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off: {
        type: DataTypes.TIME,
        allowNull: true
    },
    noOfEmployees: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Mc_breakdown: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Brkdwn_reason: {
        type: DataTypes.STRING,
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
        defaultValue:'NA'
    },
    Transfered_To: {
        type: DataTypes.STRING,
    },
    Transfered_Qty: {
        type: DataTypes.DECIMAL(10,2),
    },
    Mc_runTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }

});
export default RcnScooping;