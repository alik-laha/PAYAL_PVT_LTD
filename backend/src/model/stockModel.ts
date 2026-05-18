import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const stockModel = sequelize.define(
    "stockModel",
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
        thresholdBucket: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        inputStock: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        inputBucketStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        outputDispatchStock: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        outputRepackStock: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        outputBucketDispatchStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        outputBucketRepackStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
       
        currentStock: {
            type: 'DECIMAL(10,2) GENERATED ALWAYS AS ((inputStock + threshold ) - (outputDispatchStock + outputRepackStock )) STORED',
            set() {
                throw new Error('currentStock is read-only');
            },
        },
        currentBucketStock: {
            type: 'INTEGER GENERATED ALWAYS AS ((inputBucketStock + thresholdBucket ) - (outputBucketDispatchStock + outputBucketRepackStock )) STORED',
            set() {
                throw new Error('currentBucketStock is read-only');
            },
        },
     
        origin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gradeName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["origin","gradeName"],
            },
        ],
        timestamps: true,
    }
);

export default stockModel;