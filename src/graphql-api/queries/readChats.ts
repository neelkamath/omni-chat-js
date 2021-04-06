import { CHATS_CONNECTION_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { ChatsConnection } from '../models';
import { BackwardPagination, ForwardPagination } from '../pagination';
import { HttpApiConfig } from '../../config';

export interface ReadChatsData {
  readonly readChats: ChatsConnection;
}

/**
 * @return the chats the user is in.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function readChats(
  config: HttpApiConfig,
  accessToken: string,
  pagination?: ForwardPagination,
  privateChatMessagesPagination?: BackwardPagination,
  groupChatUsersPagination?: ForwardPagination,
  groupChatMessagesPagination?: BackwardPagination,
): Promise<GraphQlResponse<ReadChatsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query ReadChats(
          $first: Int
          $after: Cursor
          $privateChat_messages_last: Int
          $privateChat_messages_before: Cursor
          $groupChat_users_first: Int
          $groupChat_users_after: Cursor
          $groupChat_messages_last: Int
          $groupChat_messages_before: Cursor
        ) {
          readChats(first: $first, after: $after) {
             ${CHATS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: {
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
