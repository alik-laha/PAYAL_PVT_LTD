import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";



const cashewOutModel = sequelize.define('cashewOut', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false

    },
    gatePassNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    batchNo: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    invoice: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    partyName: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    gradeName: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    grossWt: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    truckNo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantity: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    actualquantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    netWeight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    noOfBags: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    noOfActualBags: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "NA"
    },

    createdBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default cashewOutModel;