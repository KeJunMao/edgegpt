import { loadEdgeGPTConfig } from "../config";
import { EdgeGPTConfig } from "../types";

import prompts, { Choice } from "prompts";
import { ChatBot } from "../ChatBot";
import { logger } from "../utils";
import chalk from "chalk";

export const run = async (options: Partial<EdgeGPTConfig>) => {
  const config = await loadEdgeGPTConfig({
    cookies: options.cookies,
    stream: options.stream,
  });

  const chatBot = new ChatBot(config);
  await chatBot.create();
  const prefix = [chalk.blue("?"), chalk.bold("Bing: ")].join(" ");
  let choices: Choice[] = [];

  while (true) {
    const cmd = await prompts([
      {
        type: choices.length ? "autocomplete" : "text",
        name: "prompt",
        message: "You: ",
        choices,
        validate: (value) => (!value ? "Prompt can not be empty" : true),
        onState(this: any) {
          if (choices.length) {
            this.fallback = { title: this.input, value: this.input };
            if (this.suggestions.length === 0) {
              this.value = this.fallback.value;
            }
          }
        },
      },
    ]);
    choices = [];
    if (!cmd.prompt) {
      continue;
    }
    if (cmd.prompt === "!exit") {
      break;
    }
    if (cmd.prompt === "!reset") {
      chatBot.reset();
      break;
    }
    let wrote = 0;
    let response: any;
    if (cmd.prompt) {
      process.stdout.write(prefix);
      if (config.stream) {
        response = await chatBot.ask(cmd.prompt, (msg) => {
          process.stdout.write(msg.slice(wrote));
          wrote = msg.length;
        });
      } else {
        process.stdout.write(
          prefix +
            (await chatBot.askAsync(cmd.prompt, (res) => {
              response = res;
            }))
        );
      }
      try {
        choices = response["item"]["messages"][1]["suggestedResponses"].map(
          (v: any) => {
            return {
              title: v.text,
            };
          }
        );
      } catch (error) {}
    }
  }
};
