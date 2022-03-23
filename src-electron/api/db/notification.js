import { Model, DataTypes } from "@sequelize/core";
import sequelize from "../db";

class notification extends Model {}

notification.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    time: {
      type: DataTypes.STRING,
    },
    cabal: {
      type: DataTypes.STRING,
    },
    channel: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Notification",
  }
);

notification.sync();

export default notification;
