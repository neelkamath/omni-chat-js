import {
  AccountInput,
  AccountUpdate,
  ActionMessageInput,
  CannotDeleteAccount,
  CannotLeaveChat,
  CreateAccountResult,
  CreateActionMessageResult,
  CreateGroupChatInviteMessageResult,
  CreateGroupChatResult,
  CreatePollMessageResult,
  CreatePrivateChatResult,
  CreateTextMessageResult,
  EmailEmailAddressVerificationResult,
  ForwardMessageResult,
  GroupChatDescription,
  GroupChatInput,
  GroupChatTitle,
  InvalidChatId,
  InvalidInviteCode,
  InvalidMessageId,
  InvalidUserId,
  LeaveGroupChatResult,
  MessageStatus,
  MessageText,
  Placeholder,
  PollInput,
  ResetPasswordResult,
  SetPollVoteResult,
  TriggerActionResult,
  UnregisteredEmailAddress,
  UpdateAccountResult,
  Uuid,
  VerifyEmailAddressResult,
} from './models';
import { queryOrMutate } from './operator';
import { ContextMessageId } from '../rest-api/models';
import { ApiUrl, HttpProtocol } from '../config';
import {
  CANNOT_DELETE_ACCOUNT_FRAGMENT,
  CANNOT_LEAVE_CHAT_FRAGMENT,
  CREATE_ACCOUNT_RESULT_FRAGMENT,
  CREATE_ACTION_MESSAGE_RESULT_FRAGMENT,
  CREATE_GROUP_CHAT_INVITE_MESSAGE_RESULT_FRAGMENT,
  CREATE_GROUP_CHAT_RESULT_FRAGMENT,
  CREATE_POLL_MESSAGE_RESULT_FRAGMENT,
  CREATE_PRIVATE_CHAT_RESULT_FRAGMENT,
  CREATE_TEXT_MESSAGE_RESULT_FRAGMENT,
  EMAIL_EMAIL_ADDRESS_VERIFICATION_RESULT_FRAGMENT,
  FORWARD_MESSAGE_RESULT_FRAGMENT,
  INVALID_CHAT_ID_FRAGMENT,
  INVALID_INVITE_CODE_FRAGMENT,
  INVALID_MESSAGE_ID_FRAGMENT,
  INVALID_USER_ID_FRAGMENT,
  LEAVE_GROUP_CHAT_RESULT_FRAGMENT,
  RESET_PASSWORD_RESULT_FRAGMENT,
  SET_POLL_VOTE_RESULT_FRAGMENT,
  TRIGGER_ACTION_RESULT_FRAGMENT,
  UNREGISTERED_EMAIL_ADDRESS_FRAGMENT,
  UPDATED_ACCOUNT_RESULT_FRAGMENT,
  VERIFY_EMAIL_ADDRESS_RESULT_FRAGMENT,
} from './fragments';

/** GraphQL mutations. */
export class MutationsApi {
  constructor(private readonly protocol: HttpProtocol, private readonly apiUrl: ApiUrl) {}

  /**
   * Creates an account, and sends the user a verification email. The user will not be allowed to log in until they
   * verify their email address. Use {@link MutationsApi.verifyEmailAddress} to verify the user's email address.
   * @returns `null` if the operation succeeded.
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async createAccount(account: AccountInput): Promise<CreateAccountResult | null> {
    const { __typename, ...accountData } = account;
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation CreateAccount($account: AccountInput!) {
          createAccount(account: $account) {
            ${CREATE_ACCOUNT_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { account: accountData },
    });
    return response.data!.createAccount;
  }

  /**
   * Joins the specified public chat. Nothing will happen if the user is already in the chat.
   * @returns `null` if the operation succeeded. An `InvalidChatId` if there's no such public chat.
   */
  async joinPublicChat(accessToken: string, chatId: number): Promise<InvalidChatId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
        mutation JoinPublicChat($chatId: Int!) {
          joinPublicChat(chatId: $chatId) {
            ${INVALID_CHAT_ID_FRAGMENT}
          }
        }
      `,
        variables: { chatId },
      },
      accessToken,
    );
    return response.data!.joinPublicChat;
  }

  /**
   * Leaves the chat the user is in. Every message the user has starred in the specified chat will be unstarred for
   * them.
   * @returns `null` if the operation succeeded. An `InvalidChatId` if the user isn't the specified group chat.
   */
  async leaveGroupChat(accessToken: string, chatId: number): Promise<LeaveGroupChatResult | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
        mutation LeaveGroupChat($chatId: Int!) {
          leaveGroupChat(chatId: $chatId) {
            ${LEAVE_GROUP_CHAT_RESULT_FRAGMENT}
          }
        }
      `,
        variables: { chatId },
      },
      accessToken,
    );
    return response.data!.leaveGroupChat;
  }

  /**
   * When a user creates an account, or updates their email address, they'll receive an email with a `verificationCode`
   * which must be passed to this operation in order to verify their email address. If the `verificationCode` is valid,
   * the account's email address verification status will be set to verified, and `null` will be returned. Use
   * `Mutation.emailEmailAddressVerification` if the user lost their verification code.
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async verifyEmailAddress(emailAddress: string, verificationCode: number): Promise<VerifyEmailAddressResult | null> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation VerifyEmailAddress($emailAddress: String!, $verificationCode: Int!) {
          verifyEmailAddress(emailAddress: $emailAddress, verificationCode: $verificationCode) {
            ${VERIFY_EMAIL_ADDRESS_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { emailAddress, verificationCode },
    });
    return response.data!.verifyEmailAddress;
  }

  /**
   * Sends the user an email to verify their `emailAddress`. An example use case for this operation is when the user
   * created an account (which caused an email address verification email to be sent) but accidentally deleted the
   * email, and therefore requires it to be resent.
   * @returns `null` will be returned if the operation succeeded.
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async emailEmailAddressVerification(emailAddress: string): Promise<EmailEmailAddressVerificationResult | null> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation EmailEmailAddressVerification($emailAddress: String!) {
          emailEmailAddressVerification(emailAddress: $emailAddress) {
            ${EMAIL_EMAIL_ADDRESS_VERIFICATION_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { emailAddress },
    });
    return response.data!.emailEmailAddressVerification;
  }

  /**
   * Sends a password reset email to the supplied `emailAddress`. The email will contain a password reset code which
   * must then be passed to {@link MutationsApi.resetPassword}.
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   * @see {@link updateAccount} Use if the user is logged in (i.e., you have an access token), and wants to update their
   * password.
   * @return `null` if the operation succeeded.
   */
  async emailPasswordResetCode(emailAddress: string): Promise<UnregisteredEmailAddress | null> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation EmailPasswordResetCode($emailAddress: String!) {
          emailPasswordResetCode(emailAddress: $emailAddress) {
            ${UNREGISTERED_EMAIL_ADDRESS_FRAGMENT}
          }
        }
      `,
      variables: { emailAddress },
    });
    return response.data!.emailPasswordResetCode;
  }

  /**
   * Updates the user's account. Only the non-`null` fields will be updated. None of the updates will take place if even
   * one of the fields were invalid. If the user updates their email address to something other than their current
   * address, they must be logged out because the current access token will be invalid until they verify their new email
   * address.
   *
   * If the user updates their email address, they'll be required to verify it before their next login via an email
   * which is sent to it. This means they'll be locked out of their account if they provide an invalid address, and will
   * have to contact the service's admin to correctly update their address. This mistake can be prevented by asking them
   * to confirm their address. For example, a UI could require the user to enter their email address twice if they're
   * updating it, and only allow the update to take place if both the entered addresses match.
   * @returns `null` if the operation succeeded.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async updateAccount(accessToken: string, update: AccountUpdate): Promise<UpdateAccountResult | null> {
    const { __typename, ...updateData } = update;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation UpdateAccount($update: AccountUpdate!) {
            updateAccount(update: $update) {
              ${UPDATED_ACCOUNT_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { update: updateData },
      },
      accessToken,
    );
    return response.data!.updateAccount;
  }

  /**
   * Updates the password of the account associated with the `emailAddress` to the `newPassword` if the
   * `passwordResetCode` is correct, and returns `null`.
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async resetPassword(
    emailAddress: string,
    passwordResetCode: number,
    newPassword: string,
  ): Promise<ResetPasswordResult | null> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation ResetPassword($emailAddress: String!, $passwordResetCode: Int!, $newPassword: Password!) {
          resetPassword(emailAddress: $emailAddress, passwordResetCode: $passwordResetCode, newPassword: $newPassword) {
            ${RESET_PASSWORD_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { emailAddress, passwordResetCode, newPassword },
    });
    return response.data!.resetPassword;
  }

  /**
   * Deletes the user's profile pic.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async deleteProfilePic(accessToken: string): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteProfilePic {
            deleteProfilePic
          }
        `,
      },
      accessToken,
    );
    return response.data!.deleteProfilePic;
  }

  /**
   * Deletes the user's account. All the user's data will be wiped from the system. This means that users in private
   * chats with the user will have their chats deleted, etc.
   * @throws {@link InternalServerError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @returns `null` if the operation succeeded.
   */
  async deleteAccount(accessToken: string): Promise<CannotDeleteAccount | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteAccount {
            deleteAccount {
              ${CANNOT_DELETE_ACCOUNT_FRAGMENT}
            }
          }
        `,
      },
      accessToken,
    );
    return response.data!.deleteAccount;
  }

  /**
   * Saves contacts. Previously saved contacts, nonexistent users, and the user's own ID will be ignored.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createContacts(accessToken: string, idList: number[]): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateContacts($idList: [Int!]!) {
            createContacts(idList: $idList)
          }
        `,
        variables: { idList },
      },
      accessToken,
    );
    return response.data!.createContacts;
  }

  /**
   * Remove saved contacts. Invalid contacts (e.g., invalid user IDs, unsaved contacts) will be ignored.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deleteContacts(accessToken: string, idList: number[]): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteContacts($idList: [Int!]!) {
            deleteContacts(idList: $idList)
          }
        `,
        variables: { idList },
      },
      accessToken,
    );
    return response.data!.deleteContacts;
  }

  /**
   * Blocks the specified user. Does nothing if they've already been blocked, or the user is blocking themselves.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @returns `null` if the operation succeeded.
   */
  async blockUser(accessToken: string, id: number): Promise<InvalidUserId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation BlockUser($id: Int!) {
            blockUser(id: $id) {
              ${INVALID_USER_ID_FRAGMENT}
            }
          }
        `,
        variables: { id },
      },
      accessToken,
    );
    return response.data!.blockUser;
  }

  /**
   * Unblocks the specified user. Does nothing if the they weren't blocked.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async unblockUser(accessToken: string, id: number): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation UnblockUser($id: Int!) {
            unblockUser(id: $id)
          }
        `,
        variables: { id },
      },
      accessToken,
    );
    return response.data!.unblockUser;
  }

  /**
   * Sets whether the user is currently online.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setOnline(accessToken: string, isOnline: boolean): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetOnline($isOnline: Boolean!) {
            setOnline(isOnline: $isOnline)
          }
        `,
        variables: { isOnline },
      },
      accessToken,
    );
    return response.data!.setOnline;
  }

  /**
   * Stars the `messageId`. The user can star their own messages. Starring an already starred message will do nothing.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @returns `null` if the operation succeeded. {@link InvalidMessageId} if the message doesn't exist.
   */
  async star(accessToken: string, messageId: number): Promise<InvalidMessageId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation Star($messageId: Int!) {
            star(messageId: $messageId) {
              ${INVALID_MESSAGE_ID_FRAGMENT}
            }
          }
        `,
        variables: { messageId },
      },
      accessToken,
    );
    return response.data!.star;
  }

  /**
   * Unstars the message. Does nothing if the message wasn't starred.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async unstar(accessToken: string, messageId: number): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation Unstar($messageId: Int!) {
            unstar(messageId: $messageId)
          }
        `,
        variables: { messageId },
      },
      accessToken,
    );
    return response.data!.unstar;
  }

  /**
   * Sets whether the user `isTyping` in the `chatId`.
   *
   * Let's consider an example use case. Once the user starts typing, the other users in the chat will see a typing
   * status on the user. Once the user stops typing for more than two seconds, the typing status will be removed.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @returns `null` if the operation succeeded. An {@link InvalidChatId} will be returned if the user isn't in the
   * chat.
   */
  async setTyping(accessToken: string, isTyping: boolean): Promise<InvalidChatId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetTyping($isTyping: Boolean!) {
            setTyping(isTyping: $isTyping) {
              ${INVALID_CHAT_ID_FRAGMENT}
            }
          }
        `,
        variables: { isTyping },
      },
      accessToken,
    );
    return response.data!.setTyping;
  }

  /**
   * @param accessToken The user must be the admin.
   * @param chatId The group chat whose pic must be deleted, if there is one.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deleteGroupChatPic(accessToken: string, chatId: number): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.deleteGroupChatPic;
  }

  /**
   * Records that the user received or read the `messageId`. If the `status` is `'READ'`, and there's no `'DELIVERED'`
   * record, the delivery status will be created. Nothing will happen if the status was already created.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @returns `null` if the operation succeeded. {@link InvalidMessageId} if either the message doesn't exist in a chat
   * the user is in or the message is the user's own.
   */
  async createStatus(accessToken: string, messageId: number, status: MessageStatus): Promise<InvalidMessageId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateStatus($messageId: Int!, $status: MessageStatus!) {
            createStatus(messageId: $messageId, status: $status) {
              ${INVALID_MESSAGE_ID_FRAGMENT}
            }
          }
        `,
        variables: { messageId, status },
      },
      accessToken,
    );
    return response.data!.createStatus;
  }

  /**
   * Only an admin can perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async updateGroupChatTitle(accessToken: string, chatId: number, title: GroupChatTitle): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.updateGroupChatTitle;
  }

  /**
   * Only an admin can perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async updateGroupChatDescription(
    accessToken: string,
    chatId: number,
    description: GroupChatDescription,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.updateGroupChatDescription;
  }

  /**
   * Users already in the chat, and nonexistent users will be ignored. Only an admin can perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async addGroupChatUsers(accessToken: string, chatId: number, idList: number[]): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.addGroupChatUsers;
  }

  /**
   * Messages sent by, and polls voted on, by removed users will remain. Nonexistent users, and users who aren't in the
   * chat will be ignored. Every message a removed user had starred in the specified chat will be unstarred for them.
   * @param accessToken - The user must be an admin.
   * @returns `null` if the operation succeeded.
   * @throws {@link InvalidUserIdError} The user attempted to leave the chat but they must first appoint another user as
   * an admin because they're the last admin of an otherwise nonempty chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async removeGroupChatUsers(accessToken: string, chatId: number, idList: number[]): Promise<CannotLeaveChat | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation RemoveGroupChatUsers($chatId: Int!, $idList: [Int!]!) {
            removeGroupChatUsers(chatId: $chatId, idList: $idList) {
              ${CANNOT_LEAVE_CHAT_FRAGMENT}
            }
          }
        `,
        variables: { chatId, idList },
      },
      accessToken,
    );
    return response.data!.removeGroupChatUsers;
  }

  /**
   * Makes every user in the user ID list an admin of the chat. Users who aren't in the chat, nonexistent users, and
   * users who are already admins are ignored. Only an admin can perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async makeGroupChatAdmins(accessToken: string, chatId: number, idList: number[]): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.makeGroupChatAdmins;
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
  async createGroupChat(accessToken: string, chat: GroupChatInput): Promise<CreateGroupChatResult> {
    const { __typename, ...input } = chat;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.createGroupChat;
  }

  /**
   * Sets whether the chat is a broadcast chat. The user must be an admin to perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setBroadcast(accessToken: string, chatId: number, isBroadcast: boolean): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetBroadcast($chatId: Int!, $isBroadcast: Boolean!) {
            setBroadcast(chatId: $chatId, isBroadcast: $isBroadcast)
          }
        `,
        variables: { chatId, isBroadcast },
      },
      accessToken,
    );
    return response.data!.setBroadcast;
  }

  /**
   * @param accessToken - The user must be an admin.
   * @returns `null` if the operation succeeded. An {@link InvalidChatId} if the chat isn't a group chat, or the chat is
   * a public chat.
   * @throws {@link InvalidChatIdError} The chat isn't a group chat, or the chat is a chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setInvitability(accessToken: string, chatId: number, isInvitable: boolean): Promise<InvalidChatId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetInvitability($chatId: Int!, $isInvitable: Boolean!) {
            setInvitability(chatId: $chatId, isInvitable: $isInvitable) {
              ${INVALID_CHAT_ID_FRAGMENT}
            }
          }
        `,
        variables: { chatId, isInvitable },
      },
      accessToken,
    );
    return response.data!.setInvitability;
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
  async joinGroupChat(accessToken: string, inviteCode: Uuid): Promise<InvalidInviteCode | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.joinGroupChat;
  }

  /**
   * Deletes a private chat. Any messages the user starred in the chat will be unstarred.
   * @returns `null` if the operation succeeded. An {@link InvalidChatId} if the user isn't in the chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deletePrivateChat(accessToken: string, chatId: number): Promise<InvalidChatId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeletePrivateChat($chatId: Int!) {
            deletePrivateChat(chatId: $chatId) {
              ${INVALID_CHAT_ID_FRAGMENT}
            }
          }
        `,
        variables: { chatId },
      },
      accessToken,
    );
    return response.data!.deletePrivateChat;
  }

  /**
   * Creates a private chat with the `userId` unless the chat already exists. In either case, the chat's ID will be
   * returned. A returned {@link InvalidUserId} indicates that the specified user doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createPrivateChat(accessToken: string, userId: number): Promise<CreatePrivateChatResult> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.createPrivateChat;
  }

  /**
   * Sends the `text` in the `chatId`. If the `chatId` is a broadcast chat, the user must be an admin to message. The
   * user might want to give their message a context, such as when replying to a message sent several messages ago. In
   * this case, the `contextMessageId` is to be the ID of the message being replied to.
   * @returns `null` if the operation succeeded. An {@link InvalidChatId} will be returned if the user isn't in the
   * chat. An {@link InvalidMessageId} if the `contextMessageId` doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createTextMessage(
    accessToken: string,
    chatId: number,
    text: MessageText,
    contextMessageId?: ContextMessageId,
  ): Promise<CreateTextMessageResult | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateTextMessage($chatId: Int!, $text: MessageText!, $contextMessageId: Int!) {
            createTextMessage(chatId: $chatId, text: $text, contextMessageId: $contextMessageId) {
              ${CREATE_TEXT_MESSAGE_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { chatId, text, contextMessageId },
      },
      accessToken,
    );
    return response.data!.createTextMessage;
  }

  /**
   * Sends the `text` in the `chatId`. For example, a restaurant's bot asks if the user wants a burger or a pizza in the
   * `text`, and the `actions` are `"burger"` and `"pizza"`. The user might want to give their message a context, such
   * as when replying to a message sent several messages ago. In this case, the `contextMessageId` is to be the ID of
   * the message being replied to.
   *
   * A frontend UI could display this message like a regular text message but with buttons below it. Action messages are
   * meant for bots; human users shouldn't be able to create them. Only the creator of the action message will be
   * notified when {@link MutationsApi.triggerAction} gets called.
   * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
   * @returns `null` if the operation succeeded. An {@link InvalidChatId} will be returned if the user isn't in the
   * chat. An {@link InvalidAction} will be returned if either there were zero `actions` or the `actions` weren't
   * unique. An {@link InvalidMessageId} will be returned if the `contextMessageId` doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createActionMessage(
    accessToken: string,
    chatId: number,
    message: ActionMessageInput,
    contextMessageId?: ContextMessageId,
  ): Promise<CreateActionMessageResult | null> {
    const { __typename, ...input } = message;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateActionMessage($chatId: Int!, $message: ActionMessageInput!, $contextMessageId: Int) {
            createActionMessage(chatId: $chatId, message: $message, contextMessageId: $contextMessageId) {
              ${CREATE_ACTION_MESSAGE_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { chatId, message: input, contextMessageId },
      },
      accessToken,
    );
    return response.data!.createActionMessage;
  }

  /**
   * Creates a {@link GroupChatInviteMessage} in the `chatId` inviting users to join the `invitedChatId`. The user might
   * want to give their message a context, such as when replying to a message sent several messages ago. In this case,
   * the `contextMessageId` is to be the ID of the message being replied to. A frontend UI might want to hide the
   * {@link GroupChatInviteMessage.inviteCode}, and instead display the {@link GroupChatInfo} returned by
   * {@link QueriesApi.readGroupChat}.
   * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
   * @returns `null` will be returned if the operation succeeded. An {@link InvalidChatId} will be returned if the user
   * isn't in the `chatId`. An {@link InvalidInvitedChat} will be returned if the `invitedChatId` isn't a group chat, or
   * the chat has turned off invitations. An {@link InvalidMessageId} will be returned if the `contextMessageId` doesn't
   * exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createGroupChatInviteMessage(
    accessToken: string,
    chatId: number,
    invitedChatId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<CreateGroupChatInviteMessageResult | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
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
    return response.data!.createGroupChatInviteMessage;
  }

  /**
   * Sends the `poll` in the `chatId`. The user might want to give their message a context, such as when replying to a
   * message sent several messages ago. In this case, the `contextMessageId` is to be the ID of the message being
   * replied to.
   * @returns `null` will be returned if the operation succeeded. An {@link InvalidChatId} will be returned if the user
   * isn't in the chat. An {@link InvalidMessageId} will be returned if the `contextMessageId` doesn't exist.
   * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createPollMessage(
    accessToken: string,
    chatId: number,
    poll: PollInput,
    contextMessageId?: ContextMessageId,
  ): Promise<CreatePollMessageResult | null> {
    const { __typename, ...input } = poll;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreatePollMessage($chatId: Int!, $poll: PollInput!, $contextMessageId: Int) {
            createPollMessage(chatId: $chatId, poll: $poll, contextMessageId: $contextMessageId) {
              ${CREATE_POLL_MESSAGE_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { chatId, poll: input, contextMessageId },
      },
      accessToken,
    );
    return response.data!.createPollMessage;
  }

  /**
   * Forwards the `messageId` to the `chatId`. The user might want to give their message a context, such as when
   * replying to a message sent several messages ago. In this case, the `contextMessageId` is to be the ID of the
   * message being replied to.
   * @returns `null` will be returned if the operation succeeded. An {@link InvalidChatId} will be returned if the user
   * isn't in the chat. An {@link InvalidMessageId} will be returned if the `messageId` or `contextMessageId` doesn't
   * exist.
   * @param accessToken - If the `chatId` is a broadcast chat, the user must be an admin to message.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async forwardMessage(
    accessToken: string,
    chatId: number,
    messageId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<ForwardMessageResult | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation ForwardMessage($chatId: Int!, $messageId: Int!, $contextMessageId: Int) {
            forwardMessage(chatId: $chatId, messageId: $messageId, contextMessageId: $contextMessageId) {
              ${FORWARD_MESSAGE_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { chatId, messageId, contextMessageId },
      },
      accessToken,
    );
    return response.data!.forwardMessage;
  }

  /**
   * Triggers the `action` on the `messageId`'s action message.
   * @returns `null` will be returned if the operation succeeded. An {@link InvalidMessageId} will be returned if
   * there's no such action message. An {@link InvalidAction} will be returned if the `action` doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async triggerAction(
    accessToken: string,
    messageId: number,
    action: MessageText,
  ): Promise<TriggerActionResult | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation TriggerAction($messageId: Int!, $action: MessageText!) {
            triggerAction(messageId: $messageId, action: $action) {
              ${TRIGGER_ACTION_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { messageId, action },
      },
      accessToken,
    );
    return response.data!.triggerAction;
  }

  /**
   * Updates the user's vote for the `option` on the `messageId`'s poll.
   * @param vote - If `true`, the user's vote will be added if it hasn't already. If `false`, the user's vote will be
   * removed if there is one.
   * @returns `null` will be returned if the operation succeeded. An {@link InvalidMessageId} will be returned if
   * there's no such poll message.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setPollVote(
    accessToken: string,
    messageId: number,
    option: MessageText,
    vote: boolean,
  ): Promise<SetPollVoteResult | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetPollVote($messageId: Int!, $option: $MessageText!, $vote: Boolean!) {
            setPollVote(messageId: $messageId, option: $option, vote: $vote) {
              ${SET_POLL_VOTE_RESULT_FRAGMENT}
            }
          }
        `,
        variables: { messageId, option, vote },
      },
      accessToken,
    );
    return response.data!.setPollVote;
  }

  /**
   * Deletes the message `id` from the chat it's from. The user can only delete their own messages.
   * @returns `null` will be returned if the operation succeeded. An {@link InvalidMessageId} will be returned if the
   * message isn't in a chat the user is in, the message isn't visible to the user because they deleted the private
   * chat, or the message isn't the user's own.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deleteMessage(accessToken: string, messageId: number): Promise<InvalidMessageId | null> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteMessage($id: Int!) {
            deleteMessage(id: $id) {
              ${INVALID_MESSAGE_ID_FRAGMENT}
            }
          }
        `,
        variables: { id: messageId },
      },
      accessToken,
    );
    return response.data!.deleteMessage;
  }
}
