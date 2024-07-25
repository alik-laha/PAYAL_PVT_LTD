import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const CleaningAbhayMc = sequelize.define('cleaningAbhayMc', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mainElevetorCup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mainElevetorSpocket: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mainElevetorChain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    mainElevetorGearBox: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    vibretor_1_scooperFan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    vibretor_1_clamSap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    vibretor_1_towerBlower: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    vibretor_2_clamSap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    vibretor2_scooperFan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    vibretor_2_towerBlower: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    wholesElevetorCup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    wholesElevetorSap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    wholesElevetorBlower: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    wholesElevetorPully: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    wholeElevetorSplitsAndBlower: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    wholeElevetorGearBox: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sizerElevetor_1_cup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sizerElevetor_2_cup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    shellHopper: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    shelllBlower: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sizerElevetor_2toUnscoopTableScooperFan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    panaboardAllPartsCleanByHandBlower: {
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
export default CleaningAbhayMc;