import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const OrderID = sequelize.define('OrderID', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderNo: {
        type: DataTypes.STRING,
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
}, {
        indexes: [
            {
                unique: true,
                fields: ['orderNo']
            }
        ]
    })
    export default OrderID;