import { CannotLeaveChat } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CANNOT_LEAVE_CHAT_FRAGMENT } from '../fragments';

export interface RemoveGroupChatUsersData {
  readonly removeGroupChatUsers: CannotLeaveChat | null;
}

/**
 * Messages sent by, and polls voted on, by removed users will remain. Nonexistent users, and users who aren't in the
 * chat will be ignored. Every message a removed user had starred in the specified chat will be unstarred for them.
 * @param accessToken - The user must be an admin.
 * @returns `null` if the operation succeeded.
 * @throws {@link InvalidUserIdError} The user attempted to leave the chat but they must first appoint another user as
 * an admin because they're the last admin of an otherwise nonempty chat.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function removeGroupChatUsers(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  idList: number[],
): Promise<GraphQlResponse<RemoveGroupChatUsersData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation RemoveGroupChatUsers($chatId: Int!, $idList: [Int!]!) {
          removeGroupChatUsers(chatId: $chatId, idList: $idList) {
            ${CANNOT_LEAVE_CHAT_FRAGMENT}
          }
        }
      `,
      variables: { chatId, idList },
    },
    accessToken,
  );
}
