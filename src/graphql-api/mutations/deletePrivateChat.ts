import { INVALID_CHAT_ID_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { InvalidChatId } from '../models';
import { HttpApiConfig } from '../../config';

export interface DeletePrivateChatData {
  readonly deletePrivateChat: InvalidChatId | null;
}

/**
 * Deletes a private chat. Any messages the user starred in the chat will be unstarred.
 * @returns `null` if the operation succeeded. An {@link InvalidChatId} if the user isn't in the chat.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function deletePrivateChat(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
): Promise<GraphQlResponse<DeletePrivateChatData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeletePrivateChat($chatId: Int!) {
          deletePrivateChat(chatId: $chatId) {
            ${INVALID_CHAT_ID_FRAGMENT}
          }
        }
      `,
      variables: { chatId },
    },
    accessToken,
  );
}
