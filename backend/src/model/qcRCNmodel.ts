import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"
import RcnPrimary from "./RcnEntryModel";

const QcRCN = sequelize.define('QcRCN', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        references:{
            model:RcnPrimary,
            key:'id'
        }
    },blNo: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },conNo: {
        type: DataTypes.STRING,
        allowNull: false,
      
    },date: {
        type: DataTypes.DATE,
        allowNull: false
    },origin: {
        type: DataTypes.STRING,
        allowNull: false
    },sampling: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:null
    },moisture: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:null
    },nutCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },fluteRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },goodKernel: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },spIm: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },reject: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },
    shell: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },
    outTurn: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:null
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
            fields: ['conNo']
        }
    ]
})


RcnPrimary.hasOne(QcRCN,{foreignKey:{name:'id'}})

QcRCN.belongsTo(RcnPrimary,{foreignKey:{name:'id'}})

export default QcRCN;