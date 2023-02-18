import { Conversation } from "./types";

export const createRequest = (con: Conversation) => {
  let invocationId = 0;
  return (
    prompt: string,
    options: string[] = [
      "deepleo",
      "enable_debug_commands",
      "disable_emoji_spoken_text",
      "enablemm",
    ]
  ) => {
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
