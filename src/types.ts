export type Path = string;
export interface CookieItem {
  name: string;
  value: string;
}

export type Cookie = CookieItem[];

export interface EdgeGPTConfig {
  cookies: Path | Path[];
  async: boolean;
}

export interface ResolvedEdgeGPTConfig {
  cookies: Cookie[];
  async: boolean;
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
