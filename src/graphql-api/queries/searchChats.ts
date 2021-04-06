import { ChatsConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { BackwardPagination, ForwardPagination } from '../pagination';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CHATS_CONNECTION_FRAGMENT } from '../fragments';

export interface SearchChatsData {
  readonly searchChats: ChatsConnection;
}

/**
 * Case-insensitively searches group chats and private chats the user is in. Private chats are searched by matching
 * the query with the username, first name, and last name of users the user has chats with. Group chats are searched
 * by matching the query with the title of group chats the user is in.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function searchChats(
  config: HttpApiConfig,
  accessToken: string,
  query: string,
  pagination?: ForwardPagination,
  privateChatMessagesPagination?: BackwardPagination,
  groupChatUsersPagination?: ForwardPagination,
  groupChatMessagesPagination?: BackwardPagination,
): Promise<GraphQlResponse<SearchChatsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query SearchChats(
          $query: String!
          $first: Int
          $after: Cursor
          $privateChat_messages_last: Int
          $privateChat_messages_before: Cursor
          $groupChat_users_first: Int
          $groupChat_users_after: Cursor
          $groupChat_messages_last: Int
          $groupChat_messages_before: Cursor
        ) {
          searchChats(query: $query, first: $first, after: $after) {
            ${CHATS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: {
        query,
        first: pagination?.first,
        after: pagination?.after,
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
}
