import { READ_CHAT_RESULT_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { ReadChatResult } from '../models';
import { BackwardPagination, ForwardPagination } from '../pagination';
import { HttpApiConfig } from '../../config';

export interface ReadChatData {
  readonly readChat: ReadChatResult;
}

/**
 * @param accessToken - Must be passed if the chat isn't a public chat.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function readChat(
  config: HttpApiConfig,
  accessToken: string | undefined,
  id: number,
  privateChatMessagesPagination?: BackwardPagination,
  groupChatUsersPagination?: ForwardPagination,
  groupChatMessagesPagination?: BackwardPagination,
): Promise<GraphQlResponse<ReadChatData>> {
  return await queryOrMutate(
    config,
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
            ${READ_CHAT_RESULT_FRAGMENT}
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
}
