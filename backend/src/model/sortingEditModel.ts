import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const SortingEditModel = sequelize.define('sortingEdit', {
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
    rcv_bigTaiho:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    rcv_jjh: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_sjh: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_sjh1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_jh1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_jk_k: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rcv_sp1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    issue_jjh: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jjh1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_sjh: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_jk1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_k1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lwp1: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_lwp: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_s: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_ss: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_yk: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_sp2: 
    {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    issue_kp: 
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
    issue_dpds: 
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
export default SortingEditModel;