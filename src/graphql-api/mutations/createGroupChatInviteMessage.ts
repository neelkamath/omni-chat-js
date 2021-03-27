import { CREATE_GROUP_CHAT_INVITE_MESSAGE_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CreateGroupChatInviteMessageResult } from '../models';

export interface CreateGroupChatInviteMessageData {
  readonly createGroupChatInviteMessage: CreateGroupChatInviteMessageResult | null;
}

/**
 * Creates a {@link GroupChatInviteMessage} in the `chatId` inviting users to join the `invitedChatId`. The user might
 * want to give their message a context, such as when replying to a message sent several messages ago. In this case, the
 * `contextMessageId` is to be the ID of the message being replied to. A frontend UI might want to hide the
 * {@link GroupChatInviteMessage.inviteCode}, and instead display the {@link GroupChatInfo} returned by
 * {@link readGroupChat}.
 * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
 * @returns `null` will be returned if the operation succeeded. An {@link InvalidChatId} will be returned if the user
 * isn't in the `chatId`. An {@link InvalidInvitedChat} will be returned if the `invitedChatId` isn't a group chat, or
 * the chat has turned off invitations. An {@link InvalidMessageId} will be returned if the `contextMessageId` doesn't
 * exist.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createGroupChatInviteMessage(
  config: HttpApiConfig,
  accessToken: string,
  chatId: number,
  invitedChatId: number,
  contextMessageId?: number,
): Promise<GraphQlResponse<CreateGroupChatInviteMessageData>> {
  return await queryOrMutate(
    config,
    {
      query: `
          mutation CreateGroupChatInviteMessage($chatId: Int!, $invitedChatId: Int!, $contextMessageId: Int) {
            createGroupChatInviteMessage(
              chatId: $chatId
              invitedChatId: $invitedChatId
              contextMessageId: $contextMessageId
            ) {
              ${CREATE_GROUP_CHAT_INVITE_MESSAGE_RESULT_FRAGMENT}
            }
        }
      `,
      variables: { chatId, invitedChatId, contextMessageId },
    },
    accessToken,
  );
}
