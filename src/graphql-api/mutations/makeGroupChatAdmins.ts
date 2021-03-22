import { Placeholder } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';

export interface MakeGroupChatAdminsData {
  readonly makeGroupChatAdmins: Placeholder;
}

/**
 * Makes every user in the user ID list an admin of the chat. Users who aren't in the chat, nonexistent users, and users
 * who are already admins are ignored. Only an admin can perform this operation.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function makeGroupChatAdmins(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  idList: number[],
): Promise<GraphQlResponse<MakeGroupChatAdminsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation MakeGroupChatAdmins($chatId: Int!, $idList: [Int!]!) {
          makeGroupChatAdmins(chatId: $chatId, idList: $idList)
        }
      `,
      variables: { chatId, idList },
    },
    accessToken,
  );
}
