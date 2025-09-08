import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const OnlineHandGrade = sequelize.define('OnlineHandGrade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    LotNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    Origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Grade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    moisture: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
   
    date: {
        type: DataTypes.DATE,
        allowNull: true
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
export default OnlineHandGrade;