import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";
import e from "express";

sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    employeeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alternateMobNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aadhaarNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    panNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    heighstQualification: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bloodGroup: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateOfJoining: {
        type: DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyMobNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pfNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resginationDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

});

export default Employee;