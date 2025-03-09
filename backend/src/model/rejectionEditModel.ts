import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const rejectionEditModel = sequelize.define('rejectionEdit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      
    },
    LotNo:{
        type: DataTypes.STRING,
        allowNull: false
        
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    altid: {
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    rcv_transfer: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_peeling:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_wholes:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_mayur: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_lw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_village: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_sorting: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_dpds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_bigTaiho: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_transfer_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    issue_packing: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_village: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_uncut_unscoop: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_shell: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_catelfeed: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    
    issue_add_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_3: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_4: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_5: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_6: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_7: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_8: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_9: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_add_10: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    entry_backlog: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    current_backlog: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    Status: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }, 
    latest: 
    {
        type:DataTypes.INTEGER,
        defaultValue: 1
    }, 
    mixingLot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    noOfdayOperators:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    noOfnightOperators:{
        type: DataTypes.INTEGER,
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
    },
   


});
export default rejectionEditModel;