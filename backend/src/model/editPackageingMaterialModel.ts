import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const EditPackagingMaterial = sequelize.define('editpackagingMaterialreceving', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    invoicequantity: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
    qualityStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
export default EditPackagingMaterial;