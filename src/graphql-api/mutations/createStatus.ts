import { InvalidMessageId, MessageStatus } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { INVALID_MESSAGE_ID_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface CreateStatusData {
  readonly createStatus: InvalidMessageId | null;
}

/**
 * Records that the user received or read the `messageId`. If the `status` is `'READ'`, and there's no `'DELIVERED'`
 * record, the delivery status will be created. Nothing will happen if the status was already created.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 * @returns `null` if the operation succeeded. {@link InvalidMessageId} if either the message doesn't exist in a chat
 * the user is in or the message is the user's own.
 */
export async function createStatus(
  config: HttpApiConfig,
  accessToken: string,
  messageId: number,
  status: MessageStatus,
): Promise<GraphQlResponse<CreateStatusData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreateStatus($messageId: Int!, $status: MessageStatus!) {
          createStatus(messageId: $messageId, status: $status) {
            ${INVALID_MESSAGE_ID_FRAGMENT}
          }
        }
      `,
      variables: { messageId, status },
    },
    accessToken,
  );
}
