import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnGrading = sequelize.define('rcnGrading', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    A: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    B: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    C: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    D: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    E: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    F: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    G: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dust: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Mc_On: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Mc_Off: {
        type: DataTypes.TIME,
        allowNull: false
    },
    noOfEmployees: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Mc_breakdown: {
        type: DataTypes.TIME,
        allowNull: false
    },
    otherTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    feeledBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grading_lotNo: {
        type: DataTypes.STRING,
        allowNull: false
    }


});
export default RcnGrading;