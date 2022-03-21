import { Model, DataTypes } from "@sequelize/core";
import sequelize from "../db";

class event extends Model {}

event.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    event: {
      type: DataTypes.JSON,
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
