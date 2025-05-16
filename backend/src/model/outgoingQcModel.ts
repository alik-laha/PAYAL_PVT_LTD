import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const qcOutgoingModel = sequelize.define('qcOutgoing', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mfgDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    orderID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    packingpk: {
        type: DataTypes.STRING,
        allowNull: false
    },

    testDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    testTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    prodName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    batchNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    LotNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    gradeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    appearance: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    colour: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    flavour: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    digitalMoisture: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    hotMoisture: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    count: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    broken: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    broken_prcnt: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    acidity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    peroxide: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    aia: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    verifiedWt: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    },
   
    editStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "N/A"
    },
   
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true,

    },
  
    
    
})
export default qcOutgoingModel;
