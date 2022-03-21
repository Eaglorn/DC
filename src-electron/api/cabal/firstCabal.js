import { ipcMain } from "electron";
import cabalClient from "../cabal";
import user from "../db/user";

const settingCreateFirstCabal = async function (key, login) {
  const newUser = await user
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
