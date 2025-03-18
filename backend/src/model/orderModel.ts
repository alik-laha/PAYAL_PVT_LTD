import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const orderPrimaryModel = sequelize.define('orderPrimary', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin:{
        type: DataTypes.STRING,
        allowNull: false
    },
    orderID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    orderInvDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gradeName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    unitRate: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    actualquantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
    gst: {
        type: DataTypes.BOOLEAN,
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
    ordStatus:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ordMappingStatus:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ordApproveStatus:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    remarks:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    totalBill:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }
})
export default orderPrimaryModel;
