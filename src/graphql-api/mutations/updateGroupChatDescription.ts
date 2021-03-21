import { HttpApiConfig } from '../../config';
import { GroupChatDescription, Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';

export interface UpdateGroupChatDescriptionData {
  readonly updateGroupChatDescription: Placeholder;
}

/**
 * Only an admin can perform this operation.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function updateGroupChatDescription(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  description: GroupChatDescription,
): Promise<GraphQlResponse<UpdateGroupChatDescriptionData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation UpdateGroupChatDescription($chatId: Int!, $description: GroupChatDescription!) {
          updateGroupChatDescription(chatId: $chatId, description: $description)
        }
      `,
      variables: { chatId, description },
    },
    accessToken,
  );
}
