import { CreateTextMessageResult, MessageText } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CREATE_TEXT_MESSAGE_RESULT_FRAGMENT } from '../fragments';

export interface CreateTextMessageData {
  readonly createTextMessage: CreateTextMessageResult | null;
}

/**
 * Sends the `text` in the `chatId`. If the `chatId` is a broadcast chat, the user must be an admin to message. The user
 * might want to give their message a context, such as when replying to a message sent several messages ago. In this
 * case, the `contextMessageId` is to be the ID of the message being replied to.
 * @returns `null` if the operation succeeded. An {@link InvalidChatId} will be returned if the user isn't in the chat.
 * An {@link InvalidMessageId} if the `contextMessageId` doesn't exist.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createTextMessage(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  text: MessageText,
  contextMessageId?: number,
): Promise<GraphQlResponse<CreateTextMessageData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreateTextMessage($chatId: Int!, $text: MessageText!, $contextMessageId: Int!) {
          createTextMessage(chatId: $chatId, text: $text, contextMessageId: $contextMessageId) {
            ${CREATE_TEXT_MESSAGE_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { chatId, text, contextMessageId },
    },
    accessToken,
  );
}
