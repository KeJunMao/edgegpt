import { Conversation, Cookie } from "./types";
import { createHeaders, stringifyCookie } from "./utils";

import https from "https";
import crypto from "crypto";

export const createConversation = async (
  cookie: Cookie
): Promise<Conversation> => {
  return new Promise((resolve, reject) => {
    let response = "";
    const headers = {
      ...createHeaders(),
      cookie: stringifyCookie(cookie),
    };

    const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
    const shuffledCiphers = [
      defaultCiphers[0],
      defaultCiphers[2],
      defaultCiphers[1],
      ...defaultCiphers.slice(3),
    ].join(":");

    https
      .get(
        "https://edgeservices.bing.com/edgesvc/turing/conversation/create",
        {
          headers,
          ciphers: shuffledCiphers,
        },
        (res) => {
          res.on("data", (chunk: Buffer) => {
            response += chunk.toString("utf-8");
          });
          res.on("end", () => {
            const data = JSON.parse(response) as Conversation;
            if (data.result.value !== "Success") {
              reject(data);
            }
            resolve(data);
          });
        }
      )
      .on("error", reject);
  });
};
