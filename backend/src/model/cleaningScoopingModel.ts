import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const CleaningScooping = sequelize.define('cleaningScooping', {
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
    gearOne: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gearTwo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    gearThree: {
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
    gearFour: {
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

});

export default CleaningScooping;