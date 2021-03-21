import { GraphQlResponse, queryOrMutate } from '../operator';
import { Placeholder } from '../models';
import { HttpApiConfig } from '../../config';

export interface SetBroadcastData {
  readonly setBroadcast: Placeholder;
}

/**
 * Sets whether the chat is a broadcast chat. The user must be an admin to perform this operation.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function setBroadcast(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  isBroadcast: boolean,
): Promise<GraphQlResponse<SetBroadcastData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation SetBroadcast($chatId: Int!, $isBroadcast: Boolean!) {
          setBroadcast(chatId: $chatId, isBroadcast: $isBroadcast)
        }
      `,
      variables: { chatId, isBroadcast },
    },
    accessToken,
  );
}
