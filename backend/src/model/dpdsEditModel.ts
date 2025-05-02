import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const DPDSEdit = sequelize.define('dpdsEdit', {
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
    rcv_Sorting:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_dp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_ds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_dp1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    issue_m_ds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_m_dp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_dp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ds_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ds_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_sp_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_yjh: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_yk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_kp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_wp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rs: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dp_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dp_3: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dp_4: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dp_3l: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ss: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_os: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_os1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_ds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_m_ds: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_dp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_m_dp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_lp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_lp_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_k_dp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_ss: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_yjh: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_yk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_sp_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_kp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_dp_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_dp_3: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_dp_4: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_os: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_os_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_wp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_V_rs: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_3: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_4: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_5: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_6: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_7: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_8: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_9: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ext_grade_10: 
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
    issue_bigTaiho: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_mayur: 
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
    }


});
export default DPDSEdit;