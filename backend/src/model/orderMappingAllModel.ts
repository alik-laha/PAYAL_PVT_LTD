import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const orderMappingModelAll = sequelize.define('orderMappingAll', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    altid: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    orderpk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    packingpk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mappingDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    finalgradeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    demandQuantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    mappedQuantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },

    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
    mappingStatus:
    {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true,

    },

    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    },

})
export default orderMappingModelAll;
