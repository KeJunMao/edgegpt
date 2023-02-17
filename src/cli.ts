#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";
import { run } from "./commands/run";
import { logger } from "./utils";

yargs(hideBin(process.argv))
  .scriptName("edgegpt")
  .command(
    "*",
    "",
    (args) => {
      return args
        .option("async", {
          type: "boolean",
          default: false,
        })
        .option("cookies", {
          type: "string",
          default: "cookies.json",
        })
        .help();
    },
    (args) => {
      run(args).catch(logger.error);
    }
  )
  .showHelpOnFail(false)
  .alias("h", "help")
  .version("version", version)
  .alias("v", "version")
  .help().argv;
