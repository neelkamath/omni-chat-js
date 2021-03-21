import { InvalidInviteCode, Uuid } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { INVALID_INVITE_CODE_FRAGMENT } from '../fragments';

export interface JoinGroupChatData {
  readonly joinGroupChat: InvalidInviteCode | null;
}

/**
 * Joins the chat the `inviteCode` is for. Nothing will happen if the user is already in the chat.
 * @returns `null` if the operation succeeded.
 * @throws {@link InvalidInviteCodeError} The invite code doesn't exist.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 * @see {@link MutationsApi.joinPublicChat}
 */
export async function joinGroupChat(
  config: HttpApiConfig,
  accessToken: string,
  inviteCode: Uuid,
): Promise<GraphQlResponse<JoinGroupChatData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation JoinGroupChat($inviteCode: Uuid!) {
          joinGroupChat(inviteCode: $inviteCode) {
            ${INVALID_INVITE_CODE_FRAGMENT}
          }
        }
      `,
      variables: { inviteCode },
    },
    accessToken,
  );
}
