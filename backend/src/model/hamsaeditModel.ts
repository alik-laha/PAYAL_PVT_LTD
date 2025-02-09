import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const hamsaEditModel = sequelize.define('hamsaedit', {
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
    rcv_transfer: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_pw_w:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_lot:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww: 
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
    rcv_transfer_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    issue_pw_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_pw_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bigTaiho: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jb: 
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
    Mc_on_3: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_3: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_3: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_3: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_3: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_1: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_1: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_1: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_1: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_1: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_2: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_2: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_2: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_2: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_2: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_4: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_4: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_4: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_4: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_4: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_5: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_5: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_5: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_5: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_5: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_6: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_6: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_6: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_6: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_6: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_on_7: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_off_7: {
        type: DataTypes.TIME,
        allowNull: true
    },  
    Mc_breakdown_7: {
        type: DataTypes.TIME,
        allowNull: true
    },
    Mc_runTime_7: {
        type: DataTypes.TIME,
        allowNull: true
    },
    otherTime_7: {
        type: DataTypes.TIME,
        allowNull: true
    }


});
export default hamsaEditModel;