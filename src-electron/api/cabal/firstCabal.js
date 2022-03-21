import { ipcMain } from "electron";
import { WindowsBalloon } from "node-notifier";
import notifier from "electron-notifications";
import path from "path";
import cabalClient from "../cabal";
import user from "../db/user";

//var notifier = new WindowsBalloon({});

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

  /*notifier.notify({
    title: "123",
    message: "321",
    sound: false,
    time: 1000 * 60 * 60 * 24,
    type: "info",
  });*/
  notifier.notify("Calendar", {
    message: "Event begins in 10 minutes",
    icon: "http://cl.ly/J49B/3951818241085781941.png",
    buttons: ["Закрыть"],
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
