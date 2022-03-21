import { Sequelize } from "@sequelize/core";
import { stateFile } from "../utils/dir";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: stateFile,
  logging: console.log,
});

export default sequelize;
