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
    },
    name: {
      type: DataTypes.STRING,
    },
    channel: {
      type: DataTypes.STRING,
    },
    notification: {
      type: DataTypes.BOOLEAN,
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
