import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const CleaningGrading = sequelize.define('cleaningGrading', {
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
    dustTable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    hopper: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    elevetorCups: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    elevetorMotorCleanByAir: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    McAllPartsClean: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    binClean: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    CallibrationRollerHolesClean: {
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

export default CleaningGrading;