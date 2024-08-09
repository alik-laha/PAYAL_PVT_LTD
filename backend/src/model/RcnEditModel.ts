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
        allowNull: true
    },
    difference: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    gatePassNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    grossWt:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    systemBags: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    noOfBags: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rcnStatus: {
        type: DataTypes.STRING,
        defaultValue: 'QC Pending'
    },
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    },
    editedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
   );

export default RcnEdit;