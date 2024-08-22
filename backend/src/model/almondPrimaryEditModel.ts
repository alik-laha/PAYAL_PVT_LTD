import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const almondPrimaryEntryEditModel = sequelize.define('almondPrimaryEditEntry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    
    },
    gateType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    recevingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    truckNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoicedate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    totalWt: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    noOfBags: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
   
   
    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
   
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      
    },
    status:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    netWeight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    gatePassNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    grossWt:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
   

})
export default almondPrimaryEntryEditModel;