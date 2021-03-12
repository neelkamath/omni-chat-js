import {
  Account,
  AccountsConnection,
  Chat,
  ChatMessages,
  GroupChat,
  GroupChatInfo,
  Login,
  MessageEdge,
  OnlineStatus,
  StarredMessage,
  TokenSet,
  TypingStatus,
  Uuid,
} from './models';
import { queryOrMutate } from './operator';
import {
  ACCOUNT_FRAGMENT,
  ACCOUNTS_CONNECTION_FRAGMENT,
  CHAT_FRAGMENT,
  CHAT_MESSAGES_FRAGMENT,
  GROUP_CHAT_FRAGMENT,
  GROUP_CHAT_INFO_FRAGMENT,
  MESSAGE_EDGE_FRAGMENT,
  ONLINE_STATUS_FRAGMENT,
  STARRED_MESSAGE_FRAGMENT,
  TOKEN_SET_FRAGMENT,
  TYPING_STATUS_FRAGMENT,
} from './fragments';
import { validateLogin, validateUuidScalar } from '../validation';
import { BackwardPagination, ForwardPagination } from './pagination';
import { ApiUrl, HttpProtocol } from '../config';

/** GraphQL queries. */
export class QueriesApi {
  constructor(private readonly protocol: HttpProtocol, private readonly apiUrl: ApiUrl) {}

  /**
   * Certain operations require authentication via an access token. You can acquire one to authenticate the user by
   * passing their {@link Login} to this operation.
   * @throws {@link ConnectionError}
   * @throws {@link NonexistentUserError}
   * @throws {@link UnverifiedEmailAddressError}
   * @throws {@link IncorrectPasswordError}
   * @throws {@link InternalServerError}
   * @throws {@link UsernameScalarError}
   * @throws {@link PasswordScalarError}
   * @see refreshTokenSet
   */
  async requestTokenSet(login: Login): Promise<TokenSet> {
    validateLogin(login);
    const { __typename, ...loginData } = login;
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        query RequestTokenSet($login: Login!) {
          requestTokenSet(login: $login) {
            ${TOKEN_SET_FRAGMENT}
          }
        }
      `,
      variables: { login: loginData },
    });
    return response.data!.requestTokenSet;
  }

  /**
   * The access token is short-lived. Once it expires, the user would have to log in again. This can be avoided by
   * passing the {@link TokenSet.refreshToken} from {@link requestTokenSet} here to request a new {@link TokenSet}.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async refreshTokenSet(refreshToken: string): Promise<TokenSet> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        query RefreshTokenSet($refreshToken: ID!) {
          refreshTokenSet(refreshToken: $refreshToken) {
            ${TOKEN_SET_FRAGMENT}
          }
        }
      `,
      variables: { refreshToken },
    });
    return response.data!.refreshTokenSet;
  }

  /**
   * @return The user's account info.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async readAccount(accessToken: string): Promise<Account> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadAccount {
            readAccount {
               ${ACCOUNT_FRAGMENT}
            }
          }
        `,
      },
      accessToken,
    );
    return response.data!.readAccount;
  }

  /**
   * @param query Case-insensitively matched against users' usernames, email addresses, first names, and last names.
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async searchUsers(query: string, pagination?: ForwardPagination): Promise<AccountsConnection> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        query SearchUsers($query: String!, $first: Int, $after: Cursor) {
          searchUsers(query: $query, first: $first, after: $after) {
            ${ACCOUNTS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: {
        query,
        first: pagination?.first,
        after: pagination?.after,
      },
    });
    return response.data!.searchUsers;
  }

  /**
   * Case-insensitively searches contacts using their usernames, first names, last names, and email addresses.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async searchContacts(
    accessToken: string,
    query: string,
    pagination?: ForwardPagination,
  ): Promise<AccountsConnection> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query SearchContacts($query: String!, $first: Int, $after: Cursor) {
            searchContacts(query: $query, first: $first, after: $after) {
              ${ACCOUNTS_CONNECTION_FRAGMENT}
            }
          }
        `,
        variables: {
          query,
          first: pagination?.first,
          after: pagination?.after,
        },
      },
      accessToken,
    );
    return response.data!.searchContacts;
  }

  /**
   * @param accessToken Must be passed if the chat isn't a public chat.
   * @throws {@link InvalidChatIdError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async readChat(
    accessToken: string | undefined,
    id: number,
    privateChatMessagesPagination?: BackwardPagination,
    groupChatUsersPagination?: ForwardPagination,
    groupChatMessagesPagination?: BackwardPagination,
  ): Promise<Chat> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadChat(
            $id: Int!
            $privateChat_messages_last: Int
            $privateChat_messages_before: Cursor
            $groupChat_users_first: Int
            $groupChat_users_after: Cursor
            $groupChat_messages_last: Int
            $groupChat_messages_before: Cursor
          ) {
            readChat(id: $id) {
              ${CHAT_FRAGMENT}
            }
          }
        `,
        variables: {
          id,
          privateChat_messages_last: privateChatMessagesPagination?.last,
          privateChat_messages_before: privateChatMessagesPagination?.before,
          groupChat_users_first: groupChatUsersPagination?.first,
          groupChat_users_after: groupChatUsersPagination?.after,
          groupChat_messages_last: groupChatMessagesPagination?.last,
          groupChat_messages_before: groupChatMessagesPagination?.before,
        },
      },
      accessToken,
    );
    return response.data!.readChat;
  }

  /**
   * @return The online statuses of users the user has in their contacts, or has a chat with.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async readOnlineStatuses(accessToken: string): Promise<OnlineStatus[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadOnlineStatuses {
            readOnlineStatuses {
              ${ONLINE_STATUS_FRAGMENT}
            }
          }
        `,
      },
      accessToken,
    );
    return response.data!.readOnlineStatuses;
  }

  /**
   * @return the chats the user is in.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async readChats(
    accessToken: string,
    privateChatMessagesPagination?: BackwardPagination,
    groupChatUsersPagination?: ForwardPagination,
    groupChatMessagesPagination?: BackwardPagination,
  ): Promise<Chat[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadChats(
            $privateChat_messages_last: Int
            $privateChat_messages_before: Cursor
            $groupChat_users_first: Int
            $groupChat_users_after: Cursor
            $groupChat_messages_last: Int
            $groupChat_messages_before: Cursor
          ) {
            readChats {
               ${CHAT_FRAGMENT}
            }
          }
        `,
        variables: {
          privateChat_messages_last: privateChatMessagesPagination?.last,
          privateChat_messages_before: privateChatMessagesPagination?.before,
          groupChat_users_first: groupChatUsersPagination?.first,
          groupChat_users_after: groupChatUsersPagination?.after,
          groupChat_messages_last: groupChatMessagesPagination?.last,
          groupChat_messages_before: groupChatMessagesPagination?.before,
        },
      },
      accessToken,
    );
    return response.data!.readChats;
  }

  /**
   * @returns the user's starred messages.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async readStars(accessToken: string): Promise<StarredMessage[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadStars {
            readStars {
              ${STARRED_MESSAGE_FRAGMENT}
            }
          }
        `,
      },
      accessToken,
    );
    return response.data!.readStars;
  }

  /**
   * @returns users blocked by this user.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async readBlockedUsers(accessToken: string, pagination?: ForwardPagination): Promise<AccountsConnection> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadBlockedUsers($first: Int, $after: Cursor) {
            readBlockedUsers(first: $first, after: $after) {
              ${ACCOUNTS_CONNECTION_FRAGMENT}
            }
          }
        `,
        variables: { first: pagination?.first, after: pagination?.after },
      },
      accessToken,
    );
    return response.data!.readBlockedUsers;
  }

  /**
   * @param accessToken Required if the chat isn't public.
   * @param query Used to case-insensitively queries text messages, poll message title and options, action message text
   * and actions, and pic message captions.
   * @throws {@link InvalidChatIdError} The chat isn't public, and the user isn't in the chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async searchChatMessages(
    accessToken: string | undefined,
    chatId: number,
    query: string,
    pagination?: BackwardPagination,
  ): Promise<MessageEdge[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query SearchChatMessages($chatId: Int!, $query: String!, $last: Int, $before: Cursor) {
            searchChatMessages(chatId: $chatId, query: $query, last: $last, before: $before) {
              ${MESSAGE_EDGE_FRAGMENT}
            }
          }
        `,
        variables: {
          chatId,
          query,
          last: pagination?.last,
          before: pagination?.before,
        },
      },
      accessToken,
    );
    return response.data!.searchChatMessages;
  }

  /**
   * Case-insensitively queries every text messages, poll message title and options, action message text and actions,
   * and pic message captions in every chat the user is in.
   * @returns Each {@link ChatMessages} will be for a particular {@link ChatMessages.chat}, and have the
   * {@link ChatMessages.messages} from the search results.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async searchMessages(
    accessToken: string,
    query: string,
    privateChatMessagesPagination?: BackwardPagination,
    groupChatUsersPagination?: ForwardPagination,
    groupChatMessagesPagination?: BackwardPagination,
  ): Promise<ChatMessages[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query SearchMessages(
            $query: String!
            $privateChat_messages_last: Int
            $privateChat_messages_before: Cursor
            $groupChat_users_first: Int
            $groupChat_users_after: Cursor
            $groupChat_messages_last: Int
            $groupChat_messages_before: Cursor
          ) {
            searchMessages(query: $query) {
              ${CHAT_MESSAGES_FRAGMENT}
            }
          }
        `,
        variables: {
          query,
          privateChat_messages_last: privateChatMessagesPagination?.last,
          privateChat_messages_before: privateChatMessagesPagination?.before,
          groupChat_users_first: groupChatUsersPagination?.first,
          groupChat_users_after: groupChatUsersPagination?.after,
          groupChat_messages_last: groupChatMessagesPagination?.last,
          groupChat_messages_before: groupChatMessagesPagination?.before,
        },
      },
      accessToken,
    );
    return response.data!.searchMessages;
  }

  /**
   * @returns the group chat's info the invite code is for.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link InvalidInviteCodeError}
   * @throws {@link UuidScalarError}
   */
  async readGroupChat(inviteCode: Uuid): Promise<GroupChatInfo> {
    validateUuidScalar(inviteCode);
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        query ReadGroupChat($inviteCode: Uuid!) {
          readGroupChat(inviteCode: $inviteCode) {
            ${GROUP_CHAT_INFO_FRAGMENT}
          }
        }
      `,
      variables: { inviteCode },
    });
    return response.data!.readGroupChat;
  }

  /**
   * Case-insensitively searches group chats and private chats the user is in. Private chats are searched by matching
   * the query with the username, first name, and last name of users the user has chats with. Group chats are searched
   * by matching the query with the title of group chats the user is in.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async searchChats(
    accessToken: string,
    query: string,
    privateChatMessagesPagination?: BackwardPagination,
    groupChatUsersPagination?: ForwardPagination,
    groupChatMessagesPagination?: BackwardPagination,
  ): Promise<Chat[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query SearchChats(
            $query: String!
            $privateChat_messages_last: Int
            $privateChat_messages_before: Cursor
            $groupChat_users_first: Int
            $groupChat_users_after: Cursor
            $groupChat_messages_last: Int
            $groupChat_messages_before: Cursor
          ) {
            searchChats(query: $query) {
              ${CHAT_FRAGMENT}
            }
          }
        `,
        variables: {
          query,
          privateChat_messages_last: privateChatMessagesPagination?.last,
          privateChat_messages_before: privateChatMessagesPagination?.before,
          groupChat_users_first: groupChatUsersPagination?.first,
          groupChat_users_after: groupChatUsersPagination?.after,
          groupChat_messages_last: groupChatMessagesPagination?.last,
          groupChat_messages_before: groupChatMessagesPagination?.before,
        },
      },
      accessToken,
    );
    return response.data!.searchChats;
  }

  /**
   * Case-insensitively searches chats by case-insensitively querying their titles.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   */
  async searchPublicChats(query: string): Promise<GroupChat[]> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        query SearchPublicChats($query: String!) {
          searchPublicChats(query: $query) {
            ${GROUP_CHAT_FRAGMENT}
          }
        }
      `,
      variables: { query },
    });
    return response.data!.searchPublicChats;
  }

  /**
   * @returns Saved contacts.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async readContacts(accessToken: string, pagination?: ForwardPagination): Promise<AccountsConnection> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadContacts($first: Int, $after: Cursor) {
            readContacts(first: $first, after: $after) {
              ${ACCOUNTS_CONNECTION_FRAGMENT}
            }
          }
        `,
        variables: { first: pagination?.first, after: pagination?.after },
      },
      accessToken,
    );
    return response.data!.readContacts;
  }

  /**
   * @returns The statuses of users who are typing in a chat the user is in. The user's own status won't be returned.
   */
  async readTypingStatuses(accessToken: string): Promise<TypingStatus[]> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          query ReadTypingStatuses {
            readTypingStatuses {
              ${TYPING_STATUS_FRAGMENT}
            }
          }
        `,
      },
      accessToken,
    );
    return response.data!.readTypingStatuses;
  }
}
