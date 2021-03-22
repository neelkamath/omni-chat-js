import { HttpApiConfig } from '../../config';
import { GroupChatTitle, Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';

export interface UpdateGroupChatTitleData {
  readonly updateGroupChatTitle: Placeholder;
}

/**
 * Only an admin can perform this operation.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function updateGroupChatTitle(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  title: GroupChatTitle,
): Promise<GraphQlResponse<UpdateGroupChatTitleData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation UpdateGroupChatTitle($chatId: Int!, $title: GroupChatTitle!) {
          updateGroupChatTitle(chatId: $chatId, title: $title)
        }
      `,
      variables: { chatId, title },
    },
    accessToken,
  );
}
