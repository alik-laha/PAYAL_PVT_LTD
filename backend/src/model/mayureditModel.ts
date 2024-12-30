import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const MayurEdit = sequelize.define('mayurEdit', {
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
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    altid: {
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    rcv_wholespeel: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_wholesunpeel: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_DPDS: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_sorting: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_village: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_transfer: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_w: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_lot: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rejection: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_village: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bigTaiho: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_LW: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_JB: 
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
    Mc_on_133: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_133: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_133: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_133: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_133: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_331: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_331: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_331: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_331: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_331: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_292: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_292: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_292: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_292: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_292: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_293: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_293: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_293: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_293: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_293: {
        type: DataTypes.TIME,
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
    }


});
export default MayurEdit;