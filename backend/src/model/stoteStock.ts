import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const StoreStockModel = sequelize.define('storeStock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    sku: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    thresoldquantity: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    
});
export default StoreStockModel;