import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const creditNoteModel = sequelize.define('creditNoteModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    creditNoteDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    creditNoteNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gradeName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    totalWt: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
     type: {
        type: DataTypes.STRING,
        allowNull: true,
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
    },
    totalBill:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     remarks:{
        type: DataTypes.STRING,
        allowNull: true,
    },
   

})
export default creditNoteModel;