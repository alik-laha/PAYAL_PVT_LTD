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
        allowNull: false,
       
    },
    truckNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
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
    editStatus: {
        type: DataTypes.STRING,
        defaultValue: "NA"
    },
    rcnStatus: {
        type: DataTypes.STRING,
        defaultValue: 'QC Pending'
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