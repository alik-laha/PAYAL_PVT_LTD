import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const VLotDetails = sequelize.define('vlotDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vlotNo: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    qty: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
       
    },
    actual_qty: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
       
    },
    loss: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
       
    },
    loss_prcntg: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
       
    },
    recevingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        
       
    }
})
    export default VLotDetails;