import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnGrading = sequelize.define('rcnGradingEdit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    B: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    C: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    D: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    E: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    F: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    G: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    dust: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    Mc_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Mc_on: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Mc_off: {
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
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    },
    Mc_runTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }


});
export default RcnGrading;