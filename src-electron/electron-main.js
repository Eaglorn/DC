import {
  app,
  BrowserWindow,
  nativeTheme,
  Menu,
  Tray,
  Notification,
} from "electron";
import path from "path";
import os from "os";

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("minimize", function (event) {
    event.preventDefault();
    mainWindow.minimize();
  });

  mainWindow.on("close", function (event) {
    event.preventDefault();
    mainWindow.minimize();
  });
}

let tray = null;

app
  .whenReady()
  .then(createWindow)
  .then(() => {
    tray = new Tray(path.resolve(__dirname, "icons/icon.png"));
    tray.setToolTip("DC");
    var contextMenu = Menu.buildFromTemplate([
      {
        label: "Закрыть",
        click: function () {
          tray.destroy();
          tray = null;
          mainWindow.destroy();
          mainWindow = null;
        },
      },
    ]);
    tray.setContextMenu(contextMenu);
    tray.setIgnoreDoubleClickEvents(true);
    tray.on("click", function (e) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  });

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const firstCabal = require("./api/cabal/firstCabal");
