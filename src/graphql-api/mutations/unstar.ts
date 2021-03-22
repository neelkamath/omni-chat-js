import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface UnstarData {
  readonly unstar: Placeholder;
}

/**
 * Unstars the message. Does nothing if the message wasn't starred.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function unstar(
  config: HttpApiConfig,
  accessToken: string,
  messageId: number,
): Promise<GraphQlResponse<UnstarData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation Unstar($messageId: Int!) {
          unstar(messageId: $messageId)
        }
      `,
      variables: { messageId },
    },
    accessToken,
  );
}
