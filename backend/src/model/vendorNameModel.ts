import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig"


const VendorName = sequelize.define('vendorName', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
export default VendorName;