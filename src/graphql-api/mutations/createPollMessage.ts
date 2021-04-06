import { HttpApiConfig } from '../../config';
import { CreatePollMessageResult, PollInput } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CREATE_POLL_MESSAGE_RESULT_FRAGMENT } from '../fragments';

export interface CreatePollMessageData {
  readonly createPollMessage: CreatePollMessageResult | null;
}

/**
 * Sends the `poll` in the `chatId`. The user might want to give their message a context, such as when replying to a
 * message sent several messages ago. In this case, the `contextMessageId` is to be the ID of the message being replied
 * to.
 * @returns `null` will be returned if the operation succeeded. An {@link InvalidChatId} will be returned if the user
 * isn't in the chat. An {@link InvalidMessageId} will be returned if the `contextMessageId` doesn't exist.
 * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createPollMessage(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  poll: PollInput,
  contextMessageId?: number,
): Promise<GraphQlResponse<CreatePollMessageResult>> {
  const { __typename, ...input } = poll;
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreatePollMessage($chatId: Int!, $poll: PollInput!, $contextMessageId: Int) {
          createPollMessage(chatId: $chatId, poll: $poll, contextMessageId: $contextMessageId) {
            ${CREATE_POLL_MESSAGE_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { chatId, poll: input, contextMessageId },
    },
    accessToken,
  );
}
