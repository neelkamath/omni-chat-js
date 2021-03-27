import { ActionMessageInput, CreateActionMessageResult } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CREATE_ACTION_MESSAGE_RESULT_FRAGMENT } from '../fragments';

export interface CreateActionMessageData {
  readonly createActionMessage: CreateActionMessageResult | null;
}

/**
 * Sends the `text` in the `chatId`. For example, a restaurant's bot asks if the user wants a burger or a pizza in the
 * `text`, and the `actions` are `"burger"` and `"pizza"`. The user might want to give their message a context, such as
 * when replying to a message sent several messages ago. In this case, the `contextMessageId` is to be the ID of the
 * message being replied to.
 *
 * A frontend UI could display this message like a regular text message but with buttons below it. Action messages are
 * meant for bots; human users shouldn't be able to create them. Only the creator of the action message will be notified
 * when {@link triggerAction} gets called.
 * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
 * @returns `null` if the operation succeeded. An {@link InvalidChatId} will be returned if the user isn't in the chat.
 * An {@link InvalidAction} will be returned if either there were zero `actions` or the `actions` weren't unique. An
 * {@link InvalidMessageId} will be returned if the `contextMessageId` doesn't exist.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createActionMessage(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  message: ActionMessageInput,
  contextMessageId?: number,
): Promise<GraphQlResponse<CreateActionMessageData>> {
  const { __typename, ...input } = message;
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreateActionMessage($chatId: Int!, $message: ActionMessageInput!, $contextMessageId: Int) {
          createActionMessage(chatId: $chatId, message: $message, contextMessageId: $contextMessageId) {
            ${CREATE_ACTION_MESSAGE_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { chatId, message: input, contextMessageId },
    },
    accessToken,
  );
}
