export type Path = string;
export interface CookieItem {
  name: string;
  value: string;
}

export type Cookie = CookieItem[];

export interface EdgeGPTConfig {
  cookies: Path | Path[];
  stream: boolean;
}

export interface ResolvedEdgeGPTConfig {
  cookies: Cookie[];
  stream: boolean;
}

export interface Conversation {
  conversationId: string;
  clientId: string;
  conversationSignature: string;
  result: {
    value: string;
  };
  headers?: any;
}

export interface EdgeGPTResponse {
  type: number;
  item: Record<string, any>;
  arguments: Record<string, any>[];
  [x: string]: any;
}
