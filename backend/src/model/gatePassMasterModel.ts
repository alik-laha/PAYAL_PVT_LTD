import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const gatePassMaster = sequelize.define('gatePassMaster', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gatePassNo: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
       
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
       
    },
    grosswt: {
        type: DataTypes.DOUBLE,
        allowNull: false
       
    },
    grosswtNo: {
        type: DataTypes.STRING,
        allowNull: true
       
    },
    vehicleNo: {
        type: DataTypes.STRING,
        allowNull: false
       
    },
    driverName: {
        type: DataTypes.STRING,
        allowNull: true
       
    },
    driverContact: {
        type: DataTypes.STRING,
        allowNull: true
       
    },
    securityName: {
        type: DataTypes.STRING,
        allowNull: true
       
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
       
    },
    receivingStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
       
    },
    netWeight: {
        type: DataTypes.DOUBLE,
        allowNull: false
       
    },
    approvalStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
       
    },
    billAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false
       
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'Created'
       
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true,
       
    },
})
    export default gatePassMaster;