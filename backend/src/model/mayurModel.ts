import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const Mayur = sequelize.define('mayur', {
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
export default Mayur;