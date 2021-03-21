import { INVALID_MESSAGE_ID_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { InvalidMessageId } from '../models';
import { HttpApiConfig } from '../../config';

export interface DeleteMessageData {
  readonly deleteMessage: InvalidMessageId | null;
}

/**
 * Deletes the message `id` from the chat it's from. The user can only delete their own messages.
 * @returns `null` will be returned if the operation succeeded. An {@link InvalidMessageId} will be returned if the
 * message isn't in a chat the user is in, the message isn't visible to the user because they deleted the private chat,
 * or the message isn't the user's own.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function deleteMessage(
  config: HttpApiConfig,
  accessToken: string,
  messageId: number,
): Promise<GraphQlResponse<DeleteMessageData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeleteMessage($id: Int!) {
          deleteMessage(id: $id) {
            ${INVALID_MESSAGE_ID_FRAGMENT}
          }
        }
      `,
      variables: { id: messageId },
    },
    accessToken,
  );
}
