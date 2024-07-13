import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnBoiling = sequelize.define('rcnBoiling', {
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
},
    {
        indexes: [
            {
                unique: true,
                fields: ['LotNo', 'origin','SizeName','Scooping_Line_Mc']
            }
        ]
    });
export default RcnBoiling;