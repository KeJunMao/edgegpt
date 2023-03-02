export type Path = string;
export interface CookieItem {
  name: string;
  value: string;
}

export type Cookie = CookieItem[];

export interface IRequestOptions {
  nlu_direct_response_filter: boolean;
  deepleo: boolean;
  disable_emoji_spoken_text: boolean;
  enable_debug_commands: boolean;
  responsible_ai_policy_235: boolean;
  enablemm: boolean;
  // style start
  h3imaginative: boolean;
  h3precise: boolean;
  harmonyv3: boolean;
  // style end
  dv3sugg: boolean;
}

export type RequestOptions = (keyof IRequestOptions)[];

export interface EdgeGPTConfig {
  cookies: Path | Path[];
  stream: boolean;
  requestOptions: RequestOptions;
}

export interface ResolvedEdgeGPTConfig {
  cookies: Cookie[];
  stream: boolean;
  requestOptions: RequestOptions;
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
