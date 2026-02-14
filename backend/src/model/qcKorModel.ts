import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const qcKOR = sequelize.define('qcKOR', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    LotNo:{
        type: DataTypes.STRING,
        allowNull: false
        
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    proddate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    prodbormadate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qcKOR: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     prodKOR: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
  
    BormaLoss: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    qcBormaLoss: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    BormaStatus: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    },
 
  
    CreatedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:'NA'
    },

    modifiedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }


});
export default qcKOR;