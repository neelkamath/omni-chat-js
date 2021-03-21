import { InvalidChatId } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { INVALID_CHAT_ID_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface SetTypingData {
  readonly setTyping: InvalidChatId | null;
}

/**
 * Sets whether the user `isTyping` in the `chatId`.
 *
 * Let's consider an example use case. Once the user starts typing, the other users in the chat will see a typing status
 * on the user. Once the user stops typing for more than two seconds, the typing status will be removed.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 * @returns `null` if the operation succeeded. An {@link InvalidChatId} will be returned if the user isn't in the chat.
 */
export async function setTyping(
  config: HttpApiConfig,
  accessToken: string,
  isTyping: boolean,
): Promise<GraphQlResponse<SetTypingData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation SetTyping($isTyping: Boolean!) {
          setTyping(isTyping: $isTyping) {
            ${INVALID_CHAT_ID_FRAGMENT}
          }
        }
      `,
      variables: { isTyping },
    },
    accessToken,
  );
}
