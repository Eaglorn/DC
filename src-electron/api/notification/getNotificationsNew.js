import { ipcMain } from "electron";
import notification from "../db/notification";

const settingNotificationGet = async function () {
  const newNotifications = await notification
    .findAll({
      attributes: ["time", "cabal", "channel", "author", "text"],
      where: {
        read: false,
      },
      raw: true,
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
  return newNotifications;
};

export default ipcMain.handle("apiNotificationsGetNew", async (event, args) => {
  return await settingNotificationGet();
});
