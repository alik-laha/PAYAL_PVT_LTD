import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlinePeeling = sequelize.define('onlinePeeling', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pressure: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    peelingTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unpeelPcntng: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cashewPcntng: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    peelingQty: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
   
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
       
    },
    cleaningStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cleanRemarks: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maintainance: {
        type: DataTypes.STRING,
        allowNull: false
    },
   maintainanceRemarks: {
        type: DataTypes.STRING,
        allowNull: false
    },

    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    indexes: [
        {
            unique: true,
            fields: ['date']
        }
    ]
})
export default OnlinePeeling;