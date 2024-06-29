import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const forgotPasswordModel = sequelize.define('forgotPassword', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EmployeeId: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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