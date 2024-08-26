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
    exitdate: {
        type: DataTypes.DATE,
        allowNull: true
       
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
       
    },
    grosswt: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
       
    },
    DocNo:{
        type: DataTypes.STRING,
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
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
       
    },
    approvalStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
       
    },
    billAmount: {
        type: DataTypes.FLOAT,
        allowNull: true
       
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
    OutTime: {
        type: DataTypes.TIME,
        allowNull: true
       
    },
    Remarks: {
        type: DataTypes.STRING,
        allowNull: true,
       
    },
})
    export default gatePassMaster;