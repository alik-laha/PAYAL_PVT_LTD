import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnBoilingEdit = sequelize.define('rcnBoilingEdit', {
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
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Scooping_Line_Mc:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    Pressure: 
    {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    CookingTime: 
    {
        type: DataTypes.TIME,
        allowNull: false
    },
    moisture: 
    {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    
    MCName: {
        type: DataTypes.STRING,
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
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
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
export default RcnBoilingEdit;