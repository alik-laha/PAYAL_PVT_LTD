import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnPeeling = sequelize.define('rcnPeeling', {
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
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
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
    } ,
    Status: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    TotalInput: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    WholesPeel: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    WholesUnpeel: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    DP: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    DS: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    DP1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    JJH: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    SJH: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    SJH1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    JH1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    JK_K: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    SP1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Husk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Rejection: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    UnpeelPiece: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Big_Taiho: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
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
    } 
    , NoOfTrolley: 
    {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});
export default RcnPeeling;