import { InvalidChatId } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { INVALID_CHAT_ID_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface JoinPublicChatData {
  readonly joinPublicChat: InvalidChatId | null;
}

/**
 * Joins the specified public chat. Nothing will happen if the user is already in the chat.
 * @returns `null` if the operation succeeded. An `InvalidChatId` if there's no such public chat.
 */
export async function joinPublicChat(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
): Promise<GraphQlResponse<JoinPublicChatData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation JoinPublicChat($chatId: Int!) {
          joinPublicChat(chatId: $chatId) {
            ${INVALID_CHAT_ID_FRAGMENT}
          }
        }
      `,
      variables: { chatId },
    },
    accessToken,
  );
}
