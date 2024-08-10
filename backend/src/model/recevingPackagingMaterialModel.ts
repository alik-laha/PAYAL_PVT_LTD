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
        allowNull: false,
    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantityKg: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantityPc: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false,
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "N/A"
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