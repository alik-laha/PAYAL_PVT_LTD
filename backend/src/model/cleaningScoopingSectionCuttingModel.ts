import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const CleaningScoopingSectionCutting = sequelize.define('cleaningScoopingSectionCutting', {
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
    gear_m3_30ta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gear_m3_40tb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gear_m372ta_50_18r: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    bladeUp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    bladeDown: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    speaderDown: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    brushBig: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    brushSmall: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    chainOneSmall: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    chainTwoLarge: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    chainThreeBig: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    chainFourBigTwo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    bigChainPatti: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    bigTwoChainPatti: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    spring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    trayCup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gear_m3_60ta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    motorPinionGear: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    cuttingChain: {
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

});

export default CleaningScoopingSectionCutting;