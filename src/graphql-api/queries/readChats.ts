import { CHAT_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { Chat } from '../models';
import { BackwardPagination, ForwardPagination } from '../pagination';
import { HttpApiConfig } from '../../config';

export interface ReadChatsData {
  readonly readChats: Chat[];
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
  privateChatMessagesPagination?: BackwardPagination,
  groupChatUsersPagination?: ForwardPagination,
  groupChatMessagesPagination?: BackwardPagination,
): Promise<GraphQlResponse<ReadChatsData>> {
  return await queryOrMutate(
    config,
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
}
