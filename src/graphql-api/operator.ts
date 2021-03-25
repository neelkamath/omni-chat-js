import { ConnectionError, InternalServerError, UnauthorizedError } from '../errors';
import { HttpApiConfig, WsApiConfig } from '../config';

/**
 * @example
 * ```typescript
 * {
 *   query: `
 *     mutation CreateAccount($account: AccountInput!) {
 *       createAccount(account: $account)
 *     }
 *   `,
 *   variables: {
 *     account: {
 *       username: 'john.doe',
 *       password: 'pass',
 *       emailAddress: 'john.doe@example.com',
 *       firstName: 'John',
 *       lastName: null,
 *       bio: null,
 *     },
 *   },
 * }
 * ```
 */
export interface GraphQlRequest {
  readonly query: string;
  readonly variables?: any;
}

export interface GraphQlResponse<T = GraphQlResponseValue> {
  readonly data?: T;
  readonly errors?: GraphQlResponseValue[];
}

export interface GraphQlResponseValue {
  readonly [key: string]: any;
}

/**
 * Executes a GraphQL query or mutation.
 * @throws {@link UnauthorizedError}
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 */
export async function queryOrMutate<T = GraphQlResponseValue>(
  { apiUrl, protocol }: HttpApiConfig,
  request: GraphQlRequest,
  accessToken?: string,
): Promise<GraphQlResponse<T>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (accessToken !== undefined) headers.Authorization = `Bearer ${accessToken}`;
  const response = await fetch(`${protocol}://${apiUrl}/query-or-mutation`, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
  });
  if (response.status === 401) throw new UnauthorizedError();
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  if (response.status !== 200) throw new ConnectionError();
  return await response.json();
}

/**
 * Executed when the socket closes due to an unexpected error. An example use case is displaying a message notifying the
 * user that the server is currently unreachable.
 */
export interface OnSocketError {
  (error: Event): void;
}

/**
 * Every time the socket sends an update, this will be called with the received GraphQL document. For example:
 * ```
 * {
 *   "data": {
 *     "subscribeToMessages": {
 *       "__typename": "NewTextMessage",
 *       "chatId": 3,
 *       "message": "Hi!"
 *     }
 *   }
 * }
 * ```
 */
export interface OnSocketMessage<T> {
  (message: GraphQlResponse<T>): void;
}

/** Call this function to close the connection. */
export interface OnSocketClose {
  (): void;
}

/**
 * Creates a GraphQL subscription.
 * @param path - For example, if the subscription is hosted on http://localhost/accounts-subscription, this should be
 * `'/accounts-subscription'`.
 * @param query - GraphQL document (i.e., the query to send to the GraphQL server).
 */
export function subscribe<T>(
  { apiUrl, protocol }: WsApiConfig,
  accessToken: string,
  path: string,
  query: string,
  onMessage: OnSocketMessage<T>,
  onError: OnSocketError,
): OnSocketClose {
  const socket = new WebSocket(`${protocol}://${apiUrl}${path}`);
  socket.addEventListener('open', () => {
    socket.send(accessToken);
    socket.send(JSON.stringify({ query }));
  });
  socket.addEventListener('message', ({ data }) => onMessage(JSON.parse(data)));
  socket.addEventListener('error', onError);
  return () => socket.close();
}
