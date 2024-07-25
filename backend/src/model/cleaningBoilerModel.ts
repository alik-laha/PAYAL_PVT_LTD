import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const CleaningBoilling = sequelize.define('cleaningBoiler', {
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
    rowWaterTank: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    filterBackWash: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    softner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    softWaterStockTank_1st: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    softWaterStockTank_2nd: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    srainer_1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    srainer_2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    srainer_3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    ecnomizerTube: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    nonReturnValve_1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    nonReturnValve_2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    nonReturnValve_3: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    tubeBrushing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    waterGage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    pessureGage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    allBoillerArea: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    allBoillerPartsDust: {
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