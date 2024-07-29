import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"
import LotNo from "./lotNomodel";


const ScpNxtOpenEdit = sequelize.define('scpnxtopenedit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    LotNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Scooping_Line_Mc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Uncut: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Unscoop: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NonCut: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

})
export default ScpNxtOpenEdit;