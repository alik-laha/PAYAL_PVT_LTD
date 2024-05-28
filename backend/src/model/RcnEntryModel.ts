import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnPrimary = sequelize.define('rcnEntry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    blNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    truckNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    netWeight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    difference: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    noOfBags: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rcnStatus: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    receivedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        indexes: [
            {
                unique: true,
                fields: ['blNo', 'conNo']
            }
        ]
    });

export default RcnPrimary;