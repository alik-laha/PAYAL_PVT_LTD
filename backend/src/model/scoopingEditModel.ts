import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnEditScooping = sequelize.define('rcnEditScooping', {
    id: {
        type: DataTypes.INTEGER,
        
        primaryKey: true,
    },
    LotNo:{
        type: DataTypes.STRING,
        allowNull: false
        
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
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
        allowNull: false
    },
    Broken: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Uncut: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Unscoop: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    NonCut: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Rejection: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Dust: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    KOR: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Trolley_Broken: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Trolley_Small_JB: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Mc_off: {
        type: DataTypes.TIME,
        allowNull: false
    },
    noOfEmployees: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false
    },
    noOfGents:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noOfSupervisors:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noOfOperators:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "NA"
    },
    Mc_runTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }


});
export default RcnEditScooping;