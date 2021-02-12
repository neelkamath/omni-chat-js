import {
    CannotDeleteAccountError,
    EmailAddressTakenError,
    EmailAddressVerifiedError,
    IncorrectPasswordError,
    InvalidActionError,
    InvalidAdminIdError,
    InvalidChatIdError,
    InvalidDomainError,
    InvalidInviteCodeError,
    InvalidInvitedChatError,
    InvalidMessageIdError,
    InvalidPollError,
    InvalidUserIdError,
    NonexistentOptionError,
    NonexistentUserError,
    UnregisteredEmailAddressError,
    UnverifiedEmailAddressError,
    UsernameTakenError
} from './errors';
import {ConnectionError, InternalServerError, UnauthorizedError} from '../errors';
import {ApiUrl, HttpProtocol, WebSocketProtocol} from "../config";

export interface GraphQlRequest {
    readonly query: string;
    readonly variables?: any;
}

export interface GraphQlResponse {
    readonly data?: GraphQlData;
    readonly errors?: GraphQlError[];
}

export interface GraphQlData {
    readonly [key: string]: any;
}

export interface GraphQlError {
    readonly message: string;

    readonly [key: string]: any;
}

/**
 * Executes a GraphQL query or mutation.
 * @throws {@link UnauthorizedError}
 * @throws {@link InternalServerError}
 * @throws {@link NonexistentUserError}
 * @throws {@link UnverifiedEmailAddressError}
 * @throws {@link EmailAddressVerifiedError}
 * @throws {@link UsernameTakenError}
 * @throws {@link IncorrectPasswordError}
 * @throws {@link EmailAddressTakenError}
 * @throws {@link InvalidChatIdError}
 * @throws {@link InvalidAdminIdError}
 * @throws {@link UnregisteredEmailAddressError}
 * @throws {@link InvalidUserIdError}
 * @throws {@link InvalidMessageIdError}
 * @throws {@link CannotDeleteAccountError}
 * @throws {@link InvalidPollError}
 * @throws {@link NonexistentOptionError}
 * @throws {@link InvalidInviteCodeError}
 * @throws {@link InvalidInvitedChatError}
 * @throws {@link InvalidDomainError}
 * @throws {@link InvalidActionError}
 * @throws {@link ConnectionError}
 */
export async function queryOrMutate(
    protocol: HttpProtocol,
    apiUrl: ApiUrl,
    request: GraphQlRequest,
    accessToken?: string,
): Promise<GraphQlResponse> {
    const headers: Record<string, string> = {'Content-Type': 'application/json'};
    if (accessToken !== undefined) headers.Authorization = `Bearer ${accessToken}`;
    const response = await fetch(
        `${protocol}://${apiUrl}/query-or-mutation`,
        {method: 'POST', headers, body: JSON.stringify(request)},
    );
    if (response.status === 401) throw new UnauthorizedError();
    if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
    if (response.status !== 200) throw new ConnectionError();
    const graphQlResponse = await response.json() as GraphQlResponse;
    handleGraphQlError(graphQlResponse.errors);
    return graphQlResponse;
}

/**
 * Executed when the socket closes due to an unexpected error. An example use case is displaying a message notifying the
 * user that the server is currently unreachable.
 */
export interface OnSocketError {
    (): void;
}

/**
 * Every time the socket sends an update, this will be called with the data.
 *
 * For example, if the socket sends the following update:
 * ```
 * {
 *     "data": {
 *         "subscribeToMessages": {
 *             "__typename": "NewTextMessage",
 *             "chatId": 3,
 *             "message": "Hi!"
 *         }
 *     }
 * }
 * ```
 * then, the following data would be passed to this function:
 * ```
 * {
 *     __typename: 'NewTextMessage',
 *     chatId: 3,
 *     message: 'Hi!',
 * }
 * ```
 */
export interface OnSocketMessage<T> {
    (message: T): void;
}

/** Call this function to close the connection. */
export interface OnSocketClose {
    (): void;
}

/**
 * Creates a GraphQL subscription.
 * @param operation Example: `'subscribeToAccounts'`.
 * @param path For example, if the subscription is hosted on http://localhost/accounts-subscription, this should be
 * `/accounts-subscription`.
 * @param query GraphQL document (i.e., the query to send to the GraphQL server).
 */
export function subscribe<T>(
    protocol: WebSocketProtocol,
    apiUrl: ApiUrl,
    accessToken: string,
    operation: string,
    path: string,
    query: string,
    onMessage: OnSocketMessage<T>,
    onError: OnSocketError,
): OnSocketClose {
    const socket = new WebSocket(`${protocol}://${apiUrl}${path}`);
    socket.addEventListener('open', () => {
        socket.send(accessToken);
        socket.send(JSON.stringify({query}));
    });
    socket.addEventListener('message', (message) => {
        const response = JSON.parse(message.data) as GraphQlResponse;
        if (response.errors !== undefined) {
            onError();
            socket.close();
        } else onMessage(response.data![operation]);
    });
    socket.addEventListener('error', onError);
    return () => socket.close();
}

/**
 * Throws the relevant error if it's documented in the API's docs. For example, if `errors[0].message` is
 * `'NONEXISTENT_USER'`, a {@link NonexistentUserError} will be thrown. Otherwise, a {@link ConnectionError} will be
 * thrown.
 * @param errors No error is thrown if this is `undefined`. If this is a `GraphQLError[]`, it's assumed at least one
 * element is present as per the GraphQL spec.
 * @throws {@link InternalServerError}
 * @throws {@link NonexistentUserError}
 * @throws {@link UnverifiedEmailAddressError}
 * @throws {@link EmailAddressVerifiedError}
 * @throws {@link UsernameTakenError}
 * @throws {@link IncorrectPasswordError}
 * @throws {@link EmailAddressTakenError}
 * @throws {@link InvalidChatIdError}
 * @throws {@link InvalidAdminIdError}
 * @throws {@link UnregisteredEmailAddressError}
 * @throws {@link InvalidUserIdError}
 * @throws {@link InvalidMessageIdError}
 * @throws {@link CannotDeleteAccountError}
 * @throws {@link InvalidPollError}
 * @throws {@link NonexistentOptionError}
 * @throws {@link InvalidInviteCodeError}
 * @throws {@link InvalidInvitedChatError}
 * @throws {@link InvalidDomainError}
 * @throws {@link InvalidActionError}
 * @throws {@link ConnectionError}
 */
function handleGraphQlError(errors: GraphQlError[] | undefined): void {
    if (errors !== undefined)
        switch (errors[0]!.message) {
            case 'INTERNAL_SERVER_ERROR':
                throw new InternalServerError();
            case 'NONEXISTENT_USER':
                throw new NonexistentUserError();
            case 'UNVERIFIED_EMAIL_ADDRESS':
                throw new UnverifiedEmailAddressError();
            case 'EMAIL_ADDRESS_VERIFIED':
                throw new EmailAddressVerifiedError();
            case 'USERNAME_TAKEN':
                throw new UsernameTakenError();
            case 'INCORRECT_PASSWORD':
                throw new IncorrectPasswordError();
            case 'EMAIL_ADDRESS_TAKEN':
                throw new EmailAddressTakenError();
            case 'INVALID_CHAT_ID':
                throw new InvalidChatIdError();
            case 'INVALID_ADMIN_ID':
                throw new InvalidAdminIdError();
            case 'UNREGISTERED_EMAIL_ADDRESS':
                throw new UnregisteredEmailAddressError();
            case 'INVALID_USER_ID':
                throw new InvalidUserIdError();
            case 'INVALID_MESSAGE_ID':
                throw new InvalidMessageIdError();
            case 'CANNOT_DELETE_ACCOUNT':
                throw new CannotDeleteAccountError();
            case 'INVALID_POLL':
                throw new InvalidPollError();
            case 'NONEXISTENT_OPTION':
                throw new NonexistentOptionError();
            case 'INVALID_INVITE_CODE':
                throw new InvalidInviteCodeError();
            case 'INVALID_INVITED_CHAT':
                throw new InvalidInvitedChatError();
            case 'INVALID_DOMAIN':
                throw new InvalidDomainError();
            case 'INVALID_ACTION':
                throw new InvalidActionError();
            default:
                throw new ConnectionError();
        }
}
