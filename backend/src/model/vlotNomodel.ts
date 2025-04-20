import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const VLotNo = sequelize.define('vlotNo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vlotNo: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    recevingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true,
        
       
    }
}, {
        indexes: [
            {
                unique: true,
                fields: ['vlotNo']
            }
        ]
    })
    export default VLotNo;