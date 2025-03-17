import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const productionStockGrade = sequelize.define('productionStockGrade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    section: {
        type: DataTypes.STRING,
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    openquantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    thresoldopenquantity: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    consumequantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    thresoldconsumequantity: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue:0
    },
    
});
export default productionStockGrade;