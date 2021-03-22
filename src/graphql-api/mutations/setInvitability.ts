import { INVALID_CHAT_ID_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { InvalidChatId } from '../models';
import { HttpApiConfig } from '../../config';

export interface SetInvitabilityData {
  readonly setInvitability: InvalidChatId | null;
}

/**
 * @param accessToken - The user must be an admin.
 * @returns `null` if the operation succeeded. An {@link InvalidChatId} if the chat isn't a group chat, or the chat is a
 * public chat.
 * @throws {@link InvalidChatIdError} The chat isn't a group chat, or the chat is a chat.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function setInvitability(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  isInvitable: boolean,
): Promise<GraphQlResponse<SetInvitabilityData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation SetInvitability($chatId: Int!, $isInvitable: Boolean!) {
          setInvitability(chatId: $chatId, isInvitable: $isInvitable) {
            ${INVALID_CHAT_ID_FRAGMENT}
          }
        }
      `,
      variables: { chatId, isInvitable },
    },
    accessToken,
  );
}
