import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const orderStockGrade2526 = sequelize.define('orderStockGrade2526', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
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
    
},{
    indexes: [
      {
        unique: true,
        fields: ['origin', 'grade'], // Unique constraint on origin + grade
      }
    ]
  });
export default orderStockGrade2526;