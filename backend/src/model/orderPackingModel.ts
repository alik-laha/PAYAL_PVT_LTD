import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const orderPackingModel = sequelize.define('orderPacking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     altid: {
            type: DataTypes.INTEGER,
            defaultValue:1
        },
    origin:{
        type: DataTypes.STRING,
        allowNull: false
    },
    orderID:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    BatchID:{
        type: DataTypes.STRING,
        allowNull: true
    },
    qualityStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
   
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mfgDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    gradeName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    demandquantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    packingquantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    convpackingquantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    unitRate: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    fulfillquantity: {
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
    latest: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 1
    }, 
   packingStatus: 
        {
            type:DataTypes.INTEGER,
            defaultValue: 0
        },

        dispatchStatus: {
            type:DataTypes.INTEGER,
            defaultValue: 0
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
export default orderPackingModel;
