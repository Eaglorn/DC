import { ipcMain } from "electron";
import notification from "../db/notification";

const settingNotificationGet = async function () {
  const newNotifications = [];
  await notification
    .findAll()
    .then((result) => {
      result.forEach((item) => {
        newNotifications.push({
          time: item.time,
          cabal: item.cabal,
          channel: item.channel,
          author: item.author,
          text: item.text,
        });
        item.destroy().then().catch();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  return newNotifications;
};

export default ipcMain.handle("apiNotificationsGetNew", async (event, args) => {
  return await settingNotificationGet();
});
