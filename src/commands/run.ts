import { loadEdgeGPTConfig } from "../config";
import { EdgeGPTConfig, EdgeGPTResponseThrottling } from "../types";
import chalk from "chalk";
import prompts, { Choice } from "prompts";
import { ChatBot } from "../ChatBot";
import ora from "ora";
// @ts-expect-error
import { marked } from "marked";
// @ts-expect-error
import TerminalRenderer from "marked-terminal";

function createOrUpdateSpinnerPrefix(throttling?: EdgeGPTResponseThrottling) {
  if (throttling) {
    return chalk.bold(
      `Bing(${throttling.numUserMessagesInConversation}/${throttling.maxNumUserMessagesInConversation}): `
    );
  }
  return chalk.bold("Bing: ");
}

export const run = async (options: Partial<EdgeGPTConfig>) => {
  const config = await loadEdgeGPTConfig({
    cookies: options.cookies,
    stream: options.stream,
    requestOptions: options.requestOptions,
  });

  const chatBot = new ChatBot(config);
  let choices: Choice[] = [];
  marked.setOptions({
    renderer: new TerminalRenderer(),
  });

  let spinnerPrefix = createOrUpdateSpinnerPrefix();
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
    } else if (cmd.prompt === "!exit") {
      chatBot.close();
      break;
    } else if (cmd.prompt === "!reset") {
      await chatBot.reset();
      continue;
    } else if (cmd.prompt.startsWith("!options")) {
      const [_c, optstr] = cmd.prompt.split(" ");
      config.requestOptions = optstr.split(",").map((v: string) => v.trim());
      console.log(
        `Update conversation request options to: ${config.requestOptions}`
      );
      continue;
    }
    if (cmd.prompt) {
      if (!chatBot.chatHub) {
        await chatBot.reset();
      }
      let response: any;

      const spinner = ora(spinnerPrefix);
      spinner.start();
      if (config.stream) {
        response = await chatBot.ask(cmd.prompt, (msg) => {
          spinner.text = `${spinnerPrefix}${marked(msg ?? "")}`;
        });
        spinner.stop();
        spinnerPrefix = createOrUpdateSpinnerPrefix(
          response["item"]["throttling"]
        );
        console.log(
          chalk.green("! ") +
            spinnerPrefix +
            marked(
              response["item"]?.["messages"]?.[1]?.["adaptiveCards"]?.[0]?.[
                "body"
              ]?.[0]?.["text"]?.trim() ?? ""
            )
        );
      } else {
        const msg = await chatBot.askAsync(cmd.prompt, (res) => {
          spinner.stop();
          response = res;
          spinnerPrefix = createOrUpdateSpinnerPrefix(
            response["item"]["throttling"]
          );
        });
        console.log(
          chalk.green("? ") + spinnerPrefix + marked(msg?.trim() ?? "")
        );
      }
      try {
        choices = response["item"]["messages"][1]["suggestedResponses"]
          .map((v: any) => {
            return {
              title: v.text,
            };
          })
          .filter((v: Choice) => typeof v.title === "string");
      } catch (error) {}
    }
  }
};
