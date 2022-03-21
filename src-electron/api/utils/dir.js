import path from "path";
import Cabal from "cabal-client";
import { homedir } from "os";

const dataDir = path.join(homedir(), ".dc", `v${Cabal.getDatabaseVersion()}`);
const stateFile = path.join(dataDir, "setting.sqlite");

export { dataDir, stateFile };
