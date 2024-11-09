import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const ItemIssue = sequelize.define('itemIssue', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    issueID:{
        type: DataTypes.STRING,
        allowNull: false
        
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    materialName: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    itemunit: 
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },  
    section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sectionunit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    issueUser:{
        type: DataTypes.STRING,
        allowNull: true
    },
    damagereturn: {
        type: DataTypes.STRING,
        allowNull: true
    },
   
    damagequantity: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    damageunit: 
    {
        type: DataTypes.STRING,
        allowNull: true
    },
    remarks: 
    {
        type: DataTypes.STRING,
        allowNull: true
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
export default ItemIssue;