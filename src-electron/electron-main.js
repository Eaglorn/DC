import { app, BrowserWindow, nativeTheme, Menu, Tray, screen } from "electron";
import { initialize, enable } from "@electron/remote/main";
import path from "path";
import os from "os";

initialize();

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
    width: 1200,
    height: 600,
    frame: false,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  enable(mainWindow.webContents);
  mainWindow.loadURL(process.env.APP_URL);

  const childWindows = new BrowserWindow({
    width: 420,
    height: 160,
    modal: true,
    frame: false,
    alwaysOnTop: true,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });
  childWindows.removeMenu();
  const publicFolder = path.resolve(
    __dirname,
    process.env.QUASAR_PUBLIC_FOLDER
  );
  enable(childWindows.webContents);
  childWindows.loadFile(publicFolder + "/notification/index.html");
  childWindows.setSkipTaskbar(true);
  const display = screen.getPrimaryDisplay();
  const dimensions = display.workArea;
  childWindows.setPosition(dimensions.width - 425, dimensions.height - 165);
  //childWindows.hide();

  if (process.env.DEBUGGING) {
    mainWindow.webContents.openDevTools();
  } else {
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
          try {
            app.exit();
            tray.destroy();
            childWindows.destroy();
            mainWindow.destroy();
            tray = null;
            childWindows = null;
            mainWindow = null;
          } catch {}
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
