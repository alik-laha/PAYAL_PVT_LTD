import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const QcRCN = sequelize.define('QcRCN', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        
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
        allowNull: true
    },moisture: {
        type: DataTypes.FLOAT,
        allowNull: true
    },nutCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },fluteRate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },goodKernel: {
        type: DataTypes.INTEGER,
        allowNull: true
    },spIm: {
        type: DataTypes.INTEGER,
        allowNull: true
    },reject: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shell: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    outTurn: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Remarks: {
        type: DataTypes.STRING,
        allowNull: false
    },
    editapprovedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },qcapprovedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },createdBy: {
        type: DataTypes.STRING,
        allowNull: false
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