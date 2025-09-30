import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const RLotNo = sequelize.define('rlotNo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rlotNo: {
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
                fields: ['rlotNo']
            }
        ]
    })
    export default RLotNo;