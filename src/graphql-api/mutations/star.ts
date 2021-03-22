import { InvalidMessageId } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { INVALID_MESSAGE_ID_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface StarData {
  readonly star: InvalidMessageId | null;
}

/**
 * Stars the `messageId`. The user can star their own messages. Starring an already starred message will do nothing.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 * @returns `null` if the operation succeeded. {@link InvalidMessageId} if the message doesn't exist.
 */
export async function star(
  config: HttpApiConfig,
  accessToken: string,
  messageId: number,
): Promise<GraphQlResponse<StarData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation Star($messageId: Int!) {
          star(messageId: $messageId) {
            ${INVALID_MESSAGE_ID_FRAGMENT}
          }
        }
      `,
      variables: { messageId },
    },
    accessToken,
  );
}
