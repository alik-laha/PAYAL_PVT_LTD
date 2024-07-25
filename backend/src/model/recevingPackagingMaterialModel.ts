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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
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

})
export default PackagingMaterial;