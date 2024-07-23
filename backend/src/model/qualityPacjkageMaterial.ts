import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"
import recevingPackage from "./recevingPackagingMaterialModel";

const QualityPackageMaterial = sequelize.define('QcPackageMaterial', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: recevingPackage,
            key: 'id'
        }
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
    qualityImage: {
        type: DataTypes.STRING(500),
        allowNull: true,
    }

})
export default QualityPackageMaterial;

