import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const WholesModel = sequelize.define('wholesGrade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
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
    rcv_pw_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_pw_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_pw_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_pw_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_pw_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     rcv_pw_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_w_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_ww_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_jb_mayur: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_jb_hamsa: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_s_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_s_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_180: 
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
    issue_s_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_210: 
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
    issue_ww_240_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_240: 
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
    issue_ww_280_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    wholes_double: 
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
    issue_ww_320_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_w_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ww_360_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_360: 
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
    issue_ww_400_A: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_aw_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jjb: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jjb1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },

    issue_payal_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_payal_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_320_lot: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_400_lot: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_in_w_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_in_w_320:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_in_w_400:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_150: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_150:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_150:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_150:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_180:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_180:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_180:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_210:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_210:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_210:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_240:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_240:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_240:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_280:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_280:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_280:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_320: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_320:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_320:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_320:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_360:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_360:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_360:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_a_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
     issue_c_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_e_400: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_sw_400:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
   issue_ssw_400:
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_400:
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
    issue_lw: 
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
    }},{
     indexes: [
        {
            unique: true,
            fields: ['LotNo','origin','altid']
        }
    ]


});
export default WholesModel;