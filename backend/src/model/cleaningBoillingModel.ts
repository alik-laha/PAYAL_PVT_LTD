import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const CleaningBoilling = sequelize.define('cleaningBoilling', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mc_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    motorAndOtherPartsCleaning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    cookingInsideWashByStream: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    drainLineCleaning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    waterWashChemberCleaning: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    pressureGageCleanning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    hopper: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    elevetorCup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    damage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    partsName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cleanedPartsImages: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    damagedPartsImages: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default CleaningBoilling;