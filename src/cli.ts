#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";
import { run } from "./commands/run";
import { logger } from "./utils";

(async () => {
  const args = await yargs(hideBin(process.argv))
    .scriptName("edgegpt")
    .usage("Usage: $0 -f [cookie file path]")
    .example("$0 -f cookie.json", "")
    .describe("f", "Cookie file path")
    .default("f", undefined, "cookie.json")
    .alias("f", "cookie-file")
    .boolean("stream")
    .describe("stream", "Used stream mode")
    .default("stream", undefined, "true")
    .alias("h", "help")
    .version("version", version)
    .alias("v", "version")
    .help().argv;

  run({
    cookies: args["cookieFile"],
    stream: args["stream"],
  }).catch(logger.error);
})();
