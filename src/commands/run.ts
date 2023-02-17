import { loadEdgeGPTConfig } from "../config";
import { EdgeGPTConfig } from "../types";

import prompts from "prompts";
import { ChatBot } from "../ChatBot";
import { logger } from "../utils";

export const run = async (options: Partial<EdgeGPTConfig>) => {
  const config = await loadEdgeGPTConfig({
    cookies: options.cookies,
    stream: options.stream,
  });

  const chatBot = new ChatBot(config);
  await chatBot.create();

  while (true) {
    const cmd = await prompts([
      {
        type: "text",
        name: "prompt",
        message: "You: ",
        validate: (value) => (!value ? "Prompt can not be empty" : true),
      },
    ]);
    let wrote = 0;
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
    if (cmd.prompt) {
      if (config.stream) {
        await chatBot.ask(cmd.prompt, (msg) => {
          process.stdout.write(msg.slice(wrote));
          wrote = msg.length;
        });
        process.stdout.write("\n");
      } else {
        logger.log(await chatBot.askAsync(cmd.prompt));
      }
    }
  }
};
