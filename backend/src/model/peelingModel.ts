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
        allowNull: true
    },
    WholesPeel: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
        
    },
    WholesUnpeel: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    DP: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    DS: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    DP1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    JJH: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    SJH: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    SJH1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    JH1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    JK_K: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    SP1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Husk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Rejection: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    UnpeelPiece: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Big_Taiho: 
    {
        type: DataTypes.DECIMAL(10,2),
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
    } 
    , NoOfTrolley: 
    {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pressure: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    moisture: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    peelingTime: {
        type: DataTypes.STRING,
        allowNull: true
    } ,

});
export default RcnPeeling;