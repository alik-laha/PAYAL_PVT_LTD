import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const lotoriginmodel = sequelize.define('lotorigintrack', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    LotNo:{
        type: DataTypes.STRING,
        allowNull: false
        
    }, 
     origin: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    mayurStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    dPDSStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    sortingStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    hansaStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    bigTaihoStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    },
    villageStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    rejectionStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    },  
    wholesgradeStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    lowergradeStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    huskStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    },
    packagingStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    },  
    dispatchStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    latest_section: 
    {
        type: DataTypes.STRING,
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'NA'
    },
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    
});
export default lotoriginmodel;