import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"
import PackagingMaterial from "./recevingPackagingMaterialModel";

const QualityEditPackageMaterial = sequelize.define('EditQcPackageMaterial', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    gatePassNo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualityStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    testingDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    gsm: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    avgWeight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    leakageTest: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dropTest: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sealCondition: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    labelingCondition: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foodGradeCirtiicate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foodGradeCirtificateStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foodGradeCirtiFicateFile: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    coaCirtificateStatus: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coaCirtificateFile: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    damageFile: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    editStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Pending'
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approvedBy: {
        type: DataTypes.STRING,
        allowNull: true
    },

})
PackagingMaterial.hasOne(QualityEditPackageMaterial, { foreignKey: { name: 'id' } })

QualityEditPackageMaterial.belongsTo(PackagingMaterial, { foreignKey: { name: 'id' } })

export default QualityEditPackageMaterial;