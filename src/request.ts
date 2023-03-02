import { Conversation, RequestOptions } from "./types";

export const defaultRequestOptions: RequestOptions = [
  "deepleo",
  "enable_debug_commands",
  "disable_emoji_spoken_text",
  "enablemm",
];

export const createRequest = (con: Conversation) => {
  let invocationId = 0;
  return (prompt: string, options: RequestOptions = defaultRequestOptions) => {
    const request = {
      arguments: [
        {
          source: "cib",
          optionsSets: options,
          isStartOfSession: invocationId == 0,
          message: {
            author: "user",
            inputMethod: "Keyboard",
            text: prompt,
            messageType: "Chat",
          },
          conversationSignature: con.conversationSignature,
          participant: {
            id: con.clientId,
          },
          conversationId: con.conversationId,
        },
      ],
      invocationId: String(invocationId),
      target: "chat",
      type: 4,
    };
    invocationId++;
    return request;
  };
};
