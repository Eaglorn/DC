import { Model, DataTypes } from "@sequelize/core";
import sequelize from "../db";

class cabal extends Model {}

cabal.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    channel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notification: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Cabal",
  }
);

cabal.sync();

export default cabal;
