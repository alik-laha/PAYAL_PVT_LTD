import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const StoreStockNew = sequelize.define(
    "StoreStockNew",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
     
        threshold: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        inputStock: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        outputStock: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        issueStock: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        currentStock: {
            type: 'DECIMAL(10,2) GENERATED ALWAYS AS ((inputStock + threshold ) - (outputStock+ issueStock)) STORED',
            set() {
                throw new Error('currentStock is read-only');
            },
        },
     
        sku: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["sku"],
            },
        ],
        timestamps: true,
    }
);

export default StoreStockNew;