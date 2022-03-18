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

import { contextBridge } from 'electron';
import Client from 'cabal-client';
import path from 'path';
import { homedir } from 'os';

const HOME_DIR = homedir();
const DATA_DIR = path.join(
  HOME_DIR,
  '.cabal',
  `v${Client.getDatabaseVersion()}`
);

const client = new Client({
  maxFeeds: 1000,
  config: {
    dbdir: DATA_DIR,
  },
  preferredPort: 3600,
});

contextBridge.exposeInMainWorld('electronCabal', {
  client: client,
  createCabal: cabal.createCabal(),
});
