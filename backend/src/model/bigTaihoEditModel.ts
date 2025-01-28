import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const bigTaihoEditModel = sequelize.define('bigTaihoEdit', {
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
    rcv_peeling:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_village: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_sorting: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_dpds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_mayur: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_hamsa: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_lw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    
    rcv_wholes: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    issue_ssp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ssp_small: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_swp_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_wsp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bits: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_swp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bb: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_bb: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bb_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bb1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bb1_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bb_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ssp_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ssp_1_small: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ssp_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ssp_2_small: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_sdp: 
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
    issue_dpds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   
    issue_husk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_sorting: 
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
    }


});
export default bigTaihoEditModel;