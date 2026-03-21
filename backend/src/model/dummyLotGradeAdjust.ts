import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"

const dummyLotGradeAdjust = sequelize.define('dummyLotGradeAdjust', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },
   date: {
        type: DataTypes.DATE,
        allowNull: false
       
    },
      time: {
        type: DataTypes.TIME,
        allowNull: false
       
    },
})
    export default dummyLotGradeAdjust;