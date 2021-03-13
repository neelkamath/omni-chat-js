/** HTTPS is strongly recommended for production. */
export type HttpProtocol = 'http' | 'https';

/** WSS is strongly recommended for production. */
export type WebSocketProtocol = 'ws' | 'wss';

/** For example, `'chat.example.com'` and `'localhost:8080'` are valid but `'http://chat.example.com'` is invalid. */
export type ApiUrl = string;
