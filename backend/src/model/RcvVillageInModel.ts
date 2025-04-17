import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const RcvVillageInModel = sequelize.define('rcvInVillage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gateType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    recevingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    truckNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
 
    invoice: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },

    wholes_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    wholes_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    lw_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    lw_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    jb_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    jb_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    jbp_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    jbp_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    sdp_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    sdp_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    husk_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    husk_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    pieces_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    pieces_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    dp_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    dp_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    e1_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    e1_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    e2_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    e2_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
 

    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
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
    remarks:{
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    totalWt:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    }

  

})
export default RcvVillageInModel;