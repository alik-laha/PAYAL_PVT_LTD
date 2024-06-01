import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const RcnEdit = sequelize.define('rcnEdit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    rcnStatus: {
        type: DataTypes.STRING,
        defaultValue: 'QC pending'
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "pending"
    },
    editedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
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

export default RcnEdit;