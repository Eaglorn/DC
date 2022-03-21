import { app, BrowserWindow, nativeTheme, ipcMain } from "electron";
import path from "path";
import os from "os";
import fs from "fs";
import Cabal from "cabal-client";
import { homedir } from "os";
const { Sequelize, Op, Model, DataTypes } = require("@sequelize/core");

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

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

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

const HOME_DIR = homedir();
const DATA_DIR = path.join(HOME_DIR, ".dc", `v${Cabal.getDatabaseVersion()}`);

const cabalClient = new Cabal({
  maxFeeds: 1000,
  config: {
    dbdir: DATA_DIR,
  },
  preferredPort: "3600",
});

const STATE_FILE = path.join(DATA_DIR, "setting.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: STATE_FILE,
  logging: console.log,
});

class DataUser extends Model {}

DataUser.init(
  {
    currentCabal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class DataCabal extends Model {}

DataCabal.init(
  {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Cabal",
  }
);

class DataChannel extends Model {}

DataChannel.init(
  {
    cabal: {
      type: DataTypes.INTEGER,
      type: DataTypes.INTEGER,

      references: {
        model: DataChannel,
        key: "id",
      },
    },
    notification: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Channel",
  }
);

const settingCreateFirstCabal = async function (key, login) {
  const newUser = await User.create({ currentCabal: key, login: login });
  await newUser.save();
};

ipcMain.handle("apiClientFirstCabalCreate", async (event, args) => {
  const result = await cabalClient.createCabal().then((cabal) => {
    return cabal;
  });
  settingCreateFirstCabal(result.key, args);
  return result.key;
});
