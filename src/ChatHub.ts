import EventEmitter from "events";
import { WebSocket } from "ws";
import { DELIMITER } from "./constant";
import { createRequest } from "./request";
import { Conversation, EdgeGPTResponse } from "./types";
import { appendIdentifier, createHeaders } from "./utils";
import TypedEmitter from "typed-emitter";

type ChatHubEvents = {
  open: (ws: WebSocket) => void;
  message: (message: string) => void;
  response: (response: EdgeGPTResponse) => void;
  final: (response: EdgeGPTResponse) => void;
  close: (code: number, reason: Buffer) => void;
  error: (error: Error) => void;
};

export class ChatHub extends (EventEmitter as new () => TypedEmitter<ChatHubEvents>) {
  protected ws!: WebSocket;
  protected request: (prompt: string) => any;

  constructor(protected conversation: Conversation) {
    super();
    this.request = createRequest(conversation);
  }

  async ask(prompt: string) {
    if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
      await this.createWs();
    }
    this.send(this.request(prompt));
  }

  askAsync(prompt: string) {
    return new Promise<string>((resolve) => {
      this.once("final", (response) => {
        resolve(
          response["item"]["messages"][1]["adaptiveCards"][0]["body"][0]["text"]
        );
      });
      this.ask(prompt);
    });
  }

  protected createWs() {
    return new Promise<WebSocket>((resolve) => {
      this.ws = new WebSocket("wss://sydney.bing.com/sydney/ChatHub", {
        headers: this.conversation.headers ?? createHeaders(),
      });
      this.ws.on("open", () => {
        this.emit("open", this.ws);
        this.send({ protocol: "json", version: 1 });
        resolve(this.ws);
      });
      this.ws.on("message", (data: Buffer) => {
        const objects = data.toString("utf-8").split(DELIMITER);
        for (const obj of objects) {
          if (!obj) {
            continue;
          }
          const response = JSON.parse(obj) as EdgeGPTResponse;
          if (response["type"] === 1) {
            const text: string =
              response["arguments"][0]["messages"][0]["adaptiveCards"][0][
                "body"
              ][0]["text"];
            this.emit("message", text);
            this.emit("response", response);
          } else if (response["type"] === 2) {
            this.emit("final", response);
          }
        }
      });
      this.ws.on("close", (...args) => {
        this.emit("close", ...args);
      });
      this.ws.on("error", (...args) => {
        this.emit("error", ...args);
      });
    });
  }

  protected send(msg: object) {
    this.ws.send(appendIdentifier(msg));
  }

  close(code?: number) {
    this.ws?.close(code);
  }
}
