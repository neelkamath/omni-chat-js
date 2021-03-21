/** For example, `'chat.example.com'` and `'localhost:8080'` are valid but `'http://chat.example.com'` is invalid. */
export type ApiUrl = string;

export interface HttpApiConfig {
  /** HTTPS is strongly recommended for production. */
  readonly protocol: 'http' | 'https';
  readonly apiUrl: ApiUrl;
}

export interface WsApiConfig {
  /** WSS is strongly recommended for production. */
  readonly protocol: 'ws' | 'wss';
  readonly apiUrl: ApiUrl;
}
