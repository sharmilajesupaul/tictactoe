// Related issue: https://github.com/TypeStrong/ts-node/issues/2100
// This file is used to register ts-node as an ESM loader.

import { pathToFileURL } from "node:url";
import { register } from "node:module";

register("ts-node/esm", pathToFileURL("./"));
