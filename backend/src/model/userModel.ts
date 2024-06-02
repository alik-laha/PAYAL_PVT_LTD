import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"
import Employee from "./employeeModel";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeId: {
        type: DataTypes.STRING,
        references: {
            model: Employee,
            key: 'employeeId'
        }
    },
    employeeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    indexes: [
        {
            unique: true,
            fields: ['username']
        }
    ]
})
export default User;