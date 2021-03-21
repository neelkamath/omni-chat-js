import { CreatePrivateChatResult } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CREATE_PRIVATE_CHAT_RESULT_FRAGMENT } from '../fragments';

export interface CreatePrivateChatData {
  readonly createPrivateChat: CreatePrivateChatResult;
}

/**
 * Creates a private chat with the `userId` unless the chat already exists. In either case, the chat's ID will be
 * returned. A returned {@link InvalidUserId} indicates that the specified user doesn't exist.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createPrivateChat(
  config: HttpApiConfig,
  accessToken: string,
  userId: number,
): Promise<GraphQlResponse<CreatePrivateChatData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreatePrivateChat($userId: Int!) {
          createPrivateChat(userId: $userId) {
            ${CREATE_PRIVATE_CHAT_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { userId },
    },
    accessToken,
  );
}
