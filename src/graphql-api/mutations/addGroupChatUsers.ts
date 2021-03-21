import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { Placeholder } from '../models';

export interface AddGroupChatUsersData {
  readonly addGroupChatUsers: Placeholder;
}

/**
 * Users already in the chat, and nonexistent users will be ignored. Only an admin can perform this operation.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function addGroupChatUsers(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  idList: number[],
): Promise<GraphQlResponse<AddGroupChatUsersData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation AddGroupChatUsers($chatId: Int!, $idList: [Int!]!) {
          addGroupChatUsers(chatId: $chatId, idList: $idList)
        }
      `,
      variables: { chatId, idList },
    },
    accessToken,
  );
}
