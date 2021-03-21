import { CreateGroupChatResult, GroupChatInput } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CREATE_GROUP_CHAT_RESULT_FRAGMENT } from '../fragments';

export interface CreateGroupChatData {
  readonly createGroupChat: CreateGroupChatResult;
}

/**
 * Creates a group chat. Nonexistent users are ignored. The `chat` parameter's {@link GroupChatInput.userIdList} and
 * {@link GroupChatInput.adminIdList} needn't contain the user's own ID, as it is implicitly included.
 *
 * @returns If an {@link InvalidAdminId} is returned, it indicates that the `chat` parameter's
 * {@link GroupChatInput.adminIdList} wasn't a subset of the {@link GroupChatInput.userIdList}.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createGroupChat(
  config: HttpApiConfig,
  accessToken: string,
  chat: GroupChatInput,
): Promise<GraphQlResponse<CreateGroupChatData>> {
  const { __typename, ...input } = chat;
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreateGroupChat($chat: GroupChatInput!) {
          createGroupChat(chat: $chat) {
            ${CREATE_GROUP_CHAT_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { chat: input },
    },
    accessToken,
  );
}
