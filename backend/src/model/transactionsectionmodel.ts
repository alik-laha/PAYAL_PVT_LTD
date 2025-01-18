import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";


const sectionTransfer = sequelize.define('sectionTransfer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    issueid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    LotNo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },

    amount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fromSection: {
        type: DataTypes.STRING,
        allowNull: false
    },
    toSection: {
        type: DataTypes.STRING,
        allowNull: false
    },
    toSectionBeforeBacklog: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    toSectionAfterBacklog: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
export default sectionTransfer;