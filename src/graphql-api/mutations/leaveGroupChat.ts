import { LeaveGroupChatResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { LEAVE_GROUP_CHAT_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface LeaveGroupChatData {
  readonly leaveGroupChat: LeaveGroupChatResult | null;
}

/**
 * Leaves the chat the user is in. Every message the user has starred in the specified chat will be unstarred for them.
 * @returns `null` if the operation succeeded. An `InvalidChatId` if the user isn't the specified group chat.
 */
export async function leaveGroupChat(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
): Promise<GraphQlResponse<LeaveGroupChatData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation LeaveGroupChat($chatId: Int!) {
          leaveGroupChat(chatId: $chatId) {
            ${LEAVE_GROUP_CHAT_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { chatId },
    },
    accessToken,
  );
}
