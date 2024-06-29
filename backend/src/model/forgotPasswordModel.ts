import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";
import Employee from "./employeeModel";
import User from "./userModel";

const forgotPasswordModel = sequelize.define('forgotPassword', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EmployeeId: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.BIGINT,
    },
    verificationCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    verificationCodeTime: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});
export default forgotPasswordModel;