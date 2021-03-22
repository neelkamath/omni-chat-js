import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface DeleteGroupChatPicData {
  readonly deleteGroupChatPic: Placeholder;
}

/**
 * @param accessToken - The user must be the admin.
 * @param chatId - The group chat whose pic must be deleted, if there is one.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function deleteGroupChatPic(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
): Promise<GraphQlResponse<DeleteGroupChatPicData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeleteGroupChatPic($chatId: Int!) {
          deleteGroupChatPic(chatId: $chatId)
        }
      `,
      variables: { chatId },
    },
    accessToken,
  );
}
