import { ForwardMessageResult } from '../models';
import { HttpApiConfig } from '../../config';
import { ContextMessageId } from '../../rest-api';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { FORWARD_MESSAGE_RESULT_FRAGMENT } from '../fragments';

export interface ForwardMessageData {
  readonly forwardMessage: ForwardMessageResult | null;
}

/**
 * Forwards the `messageId` to the `chatId`. The user might want to give their message a context, such as when
 * replying to a message sent several messages ago. In this case, the `contextMessageId` is to be the ID of the
 * message being replied to.
 * @returns `null` will be returned if the operation succeeded. An {@link InvalidChatId} will be returned if the user
 * isn't in the chat. An {@link InvalidMessageId} will be returned if the `messageId` or `contextMessageId` doesn't
 * exist.
 * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function forwardMessage(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  messageId: number,
  contextMessageId?: ContextMessageId,
): Promise<GraphQlResponse<ForwardMessageData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation ForwardMessage($chatId: Int!, $messageId: Int!, $contextMessageId: Int) {
          forwardMessage(chatId: $chatId, messageId: $messageId, contextMessageId: $contextMessageId) {
            ${FORWARD_MESSAGE_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { chatId, messageId, contextMessageId },
    },
    accessToken,
  );
}
