import { Model, DataTypes } from "@sequelize/core";
import sequelize from "../db";

class event extends Model {}

event.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    currentCabal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Event",
  }
);

event.sync();

export default event;
