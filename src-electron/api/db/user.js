import { Model, DataTypes } from "@sequelize/core";
import sequelize from "../db";

class user extends Model {}

user.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    currentCabal: {
      type: DataTypes.STRING,
    },
    login: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "User",
  }
);

user.sync();

export default user;
