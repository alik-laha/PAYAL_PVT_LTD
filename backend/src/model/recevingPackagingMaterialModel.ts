import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const PackagingMaterial = sequelize.define('packagingMaterialreceving', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    quantityKg: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantityPc: {
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
    },

})
export default PackagingMaterial;