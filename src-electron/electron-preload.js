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

import { contextBridge } from "electron";
import cabal from "cabal-client";
import path from "path";
import { homedir } from "os";

const PREFERRED_PORT = "3600";
const HOME_DIR = homedir();
const DATA_DIR = path.join(
  HOME_DIR,
  ".cabal",
  `v${cabal.getDatabaseVersion()}`
);
const MAX_FEEDS = 1000;

const client = new cabal({
  maxFeeds: MAX_FEEDS,
  config: {
    dbdir: DATA_DIR,
  },
  preferredPort: PREFERRED_PORT,
});

contextBridge.exposeInMainWorld("electronCabal", {
  cabal: client,
});
