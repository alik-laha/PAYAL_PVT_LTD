import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const prodFormLock = sequelize.define('prodFormLock', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    formName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
        
    },
    isLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    lockedBy: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    
});
export default prodFormLock;