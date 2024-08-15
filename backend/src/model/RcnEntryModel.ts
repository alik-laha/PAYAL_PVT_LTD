import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";



const RcnPrimary = sequelize.define('rcnEntry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
       
    },
    gatePassNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    blNo: {
        type: DataTypes.STRING,
        allowNull: true,
          
    },
    grossWt:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },

    truckNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conNo: {
        type: DataTypes.STRING,
        allowNull: true,
        
    },
    blWeight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    netWeight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    difference: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    noOfBags: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    systemBags: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "NA"
    },
    rcnStatus: {
        type: DataTypes.STRING,
        defaultValue: 'QC Pending'
    },
    receivedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default RcnPrimary;