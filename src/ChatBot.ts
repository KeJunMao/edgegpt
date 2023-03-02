import _ from "lodash";
import { ChatHub } from "./ChatHub";
import { createConversation } from "./conversation";
import { ResolvedEdgeGPTConfig } from "./types";

export class ChatBot {
  chatHub?: ChatHub;
  wrote: number = 0;
  constructor(public config: ResolvedEdgeGPTConfig) {}

  async create() {
    const cookie = _.sample(this.config.cookies);
    if (!cookie?.length) {
      throw new Error("Cookies can not be empty");
    }

    let conversation = await createConversation(cookie);
    this.chatHub = new ChatHub(conversation);
    return this;
  }

  async askAsync(
    prompt: string,
    handler: (response: Record<string, any>) => void = () => {}
  ) {
    this.chatHub?.once("final", handler);
    return await this.chatHub?.askAsync(prompt, this.config.requestOptions);
  }

  async ask(prompt: string, handler: (msg: string) => void = () => {}) {
    return new Promise(async (resolve) => {
      this.chatHub?.on("message", handler);
      this.chatHub?.once("final", (res) => {
        this.chatHub?.off("message", handler);
        resolve(res);
      });
      await this.chatHub?.ask(prompt, this.config.requestOptions);
    });
  }

  close() {
    this.chatHub?.close();
  }

  async reset() {
    this.chatHub?.close();
    await this.create();
  }
}
