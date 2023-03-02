#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { version } from "../package.json";
import { run } from "./commands/run";
import { defaultRequestOptions } from "./request";
import { logger } from "./utils";

(async () => {
  const args = await yargs(hideBin(process.argv))
    .scriptName("edgegpt")
    .usage(
      `Usage: $0 [options]

\t!reset Reset the conversation
\t!exit Exit the program`
    )
    .example("$0 -f cookie.json", "")
    .describe("f", "Cookie file path")
    .default("f", undefined, "cookie.json")
    .alias("f", "cookie-file")
    .boolean("stream")
    .describe("stream", "Used stream mode")
    .default("stream", undefined, "true")
    .option("options", {
      type: "array",
    })
    .default("options", undefined, defaultRequestOptions.join(","))
    .describe("options", "Conversation request options")
    .alias("h", "help")
    .version("version", version)
    .alias("v", "version")
    .help()
    .epilog(
      `Repo: https://github.com/kejunmao/edgegpt\nBy: KeJun\nLicense: MIT`
    ).argv;

  run({
    cookies: args["cookieFile"],
    stream: args["stream"],
    requestOptions: args["options"],
  }).catch(logger.error);
})();
