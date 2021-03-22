import { ReadGroupChatResult, Uuid } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { READ_GROUP_CHAT_RESULT_FRAGMENT } from '../fragments';

export interface ReadGroupChatData {
  readonly readGroupChat: ReadGroupChatResult;
}

/**
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @returns The group chat's info the invite code is for. This could be used to display a chat the user isn't in but
 * was invited to, so that they can check whether they'd like to join.
 */
export async function readGroupChat(
  config: HttpApiConfig,
  inviteCode: Uuid,
): Promise<GraphQlResponse<ReadGroupChatData>> {
  return await queryOrMutate(config, {
    query: `
      query ReadGroupChat($inviteCode: Uuid!) {
        readGroupChat(inviteCode: $inviteCode) {
          ${READ_GROUP_CHAT_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { inviteCode },
  });
}
