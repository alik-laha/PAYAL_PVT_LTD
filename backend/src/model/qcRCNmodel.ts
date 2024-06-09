import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const QcRCN = sequelize.define('QcRCN', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },blNo: {
        type: DataTypes.STRING,
        allowNull: false
    },conNo: {
        type: DataTypes.STRING,
        allowNull: false
    },date: {
        type: DataTypes.DATE,
        allowNull: false
    },origin: {
        type: DataTypes.STRING,
        allowNull: false
    },sampling: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:0
    },moisture: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:0
    },nutCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },fluteRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },goodKernel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },spIm: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },reject: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },
    shell: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },
    outTurn: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:0
    },
    Remarks: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    },
    editapprovedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    },qcapprovedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    },createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    },editStatus:{
        type:DataTypes.STRING,
        defaultValue: "NA"
    },
    reportStatus:{
        type:DataTypes.INTEGER,
        defaultValue: 0
    }
   
}, {
    indexes: [
        {
            unique: true,
            fields: ['blNo','conNo']
        }
    ]
})



export default QcRCN;