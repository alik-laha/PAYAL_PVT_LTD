import { DataTypes } from "sequelize";
import sequelize from "../config/databaseConfig";

const transactionModel = sequelize.define(
  "transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qr_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lotNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gradeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batchNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    partyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grossWt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    netWt: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "GENERATED",
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scanedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    entryTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    exitDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exitTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["qr_id"],
      },
    ],
    timestamps: true,
  }
);

export default transactionModel;
