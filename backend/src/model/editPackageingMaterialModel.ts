import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const EditPackagingMaterial = sequelize.define('editpackagingMaterialreceving', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    recevingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qualityStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },

})
export default EditPackagingMaterial;