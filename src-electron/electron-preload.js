/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { contextBridge, ipcRenderer } from "electron";
import { BrowserWindow } from "@electron/remote";

contextBridge.exposeInMainWorld("apiCabal", {
  async createFirstCabal(login) {
    const result = await ipcRenderer
      .invoke("apiClientFirstCabalCreate", login)
      .then((result) => {
        return result;
      });
    return result;
  },
});

contextBridge.exposeInMainWorld("apiNotifications", {
  async getNotificationsNew() {
    const result = await ipcRenderer
      .invoke("apiNotificationsGetNew")
      .then((result) => {
        return result;
      });
    return result;
  },
});

contextBridge.exposeInMainWorld("apiMainWindow", {
  minimize() {
    BrowserWindow.getFocusedWindow().minimize();
  },

  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },

  close() {
    BrowserWindow.getFocusedWindow().hide();
  },
});

contextBridge.exposeInMainWorld("apiChildWindow", {
  close() {
    BrowserWindow.getFocusedWindow().hide();
  },
  isMessages(isMessages) {
    ipcRenderer.invoke("apiChildWindowIsMessages", isMessages);
  },
});
