import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const LWModel = sequelize.define('lowerGrade', {
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
    rcv_transfer: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_mayur:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_wholes: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_hamsa: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_transfer_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_kw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_kw_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_kw_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_kn: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dw_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_dw_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ow: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ow_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ow_2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_row: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rej_1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw3_180: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw3_210: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw3_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw3_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw3_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw4: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw5: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw6: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw7: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rej_3: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rej_4: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jb2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_sjb: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_240: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_280: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k_360: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_pkw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_bw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_rrw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_fw: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lw: 
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
    issue_hamsa: 
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
export default LWModel;