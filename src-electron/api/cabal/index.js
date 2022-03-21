import Cabal from "cabal-client";
import { dataDir } from "../utils/dir";

const cabalClient = new Cabal({
  maxFeeds: 1000,
  config: {
    dbdir: dataDir,
  },
  preferredPort: "3600",
});

export default cabalClient;
