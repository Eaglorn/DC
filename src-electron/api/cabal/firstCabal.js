import { ipcMain } from "electron";
import cabalClient from "../cabal";
import user from "../db/user";
import notification from "../db/notification";
const { faker } = require("@faker-js/faker");
faker.locale = "ru";

const settingCreateFirstCabal = async function (key, login) {
  user
    .create({
      currentCabal: key,
      login: login,
    })
    .then((result) => {
      result
        .save()
        .then()
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  notification
    .create({
      time: faker.date
        .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
        .toString(),
      cabal: faker.company.companyName(),
      channel: faker.internet.domainName(),
      author: faker.name.findName(),
      text: faker.lorem.text(),
    })
    .then((result) => {
      result
        .save()
        .then()
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default ipcMain.handle(
  "apiClientFirstCabalCreate",
  async (event, args) => {
    const result = await cabalClient.createCabal().then((cabal) => {
      return cabal;
    });
    settingCreateFirstCabal(result.key, args);
    return result.key;
  }
);
