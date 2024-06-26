import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const LotNo = sequelize.define('lotNo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lotNo: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
       
    }
}, {
        indexes: [
            {
                unique: true,
                fields: ['lotNo']
            }
        ]
    })
    export default LotNo;