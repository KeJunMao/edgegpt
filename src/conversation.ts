import { Conversation, Cookie } from "./types";
import { ofetch } from "ofetch";
import { createHeaders, stringifyCookie } from "./utils";

export const createConversation = async (cookie: Cookie) => {
  const headers = {
    ...createHeaders(),
    cookie: stringifyCookie(cookie),
  };
  console.log(headers)
  const result = await ofetch<Conversation>(
    "https://edgeservices.bing.com/edgesvc/turing/conversation/create",
    {
      headers,
    }
  );
  if (result.result.value !== "Success") {
    throw result;
  }
  result.headers = headers;
  return result;
};
