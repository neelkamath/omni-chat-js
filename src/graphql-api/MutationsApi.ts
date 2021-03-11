import {
  AccountInput,
  AccountUpdate,
  ActionMessageInput,
  GroupChatDescription,
  GroupChatInput,
  GroupChatTitle,
  MessageStatus,
  MessageText,
  Placeholder,
  PollInput,
  Uuid,
} from './models';
import {queryOrMutate} from './operator';
import {
  validateAccountInput,
  validateAccountUpdate,
  validateActionMessageInput,
  validateGroupChatDescriptionScalar,
  validateGroupChatInput,
  validateGroupChatTitleScalar,
  validateMessageTextScalar,
  validatePollInput,
  validateUuidScalar,
} from '../validation';
import {ContextMessageId} from '../rest-api/models';
import {ApiUrl, HttpProtocol} from '../config';

/** GraphQL mutations. */
export class MutationsApi {
  constructor(
    private readonly protocol: HttpProtocol,
    private readonly apiUrl: ApiUrl,
  ) {}

  /**
   * Creates an account, and sends the user a verification email. The user will
   * not be allowed to log in until they verify their email address.
   * @throws {@link ConnectionError}
   * @throws {@link UsernameTakenError}
   * @throws {@link EmailAddressTakenError}
   * @throws {@link InvalidDomainError}
   * @throws {@link InternalServerError}
   * @throws {@link UsernameScalarError}
   * @throws {@link PasswordScalarError}
   * @throws {@link NameScalarError}
   * @throws {@link BioScalarError}
   */
  async createAccount(account: AccountInput): Promise<Placeholder> {
    validateAccountInput(account);
    const {__typename, ...accountData} = account;
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation CreateAccount($account: AccountInput!) {
          createAccount(account: $account)
        }
      `,
      variables: {account: accountData},
    });
    return response.data!.createAccount;
  }

  /**
   * When a user creates an account, or updates their email address, they'll
   * receive an email with a verification code to verify their email address. If
   * the verification code is valid, the account's email address verification
   * status will be set to verified.
   * @returns {boolean} If the verification code was valid, <true> will be
   * returned since the account was verified. Otherwise, <false> will be
   * returned.
   * @throws {@link ConnectionError}
   * @throws {@link UnregisteredEmailAddressError}
   * @throws {@link InternalServerError}
   */
  async verifyEmailAddress(
    emailAddress: string,
    verificationCode: number,
  ): Promise<boolean> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation VerifyEmailAddress(
          $emailAddress: String!
          $verificationCode: Int!
        ) {
          verifyEmailAddress(
            emailAddress: $emailAddress
            verificationCode: $verificationCode
          )
        }
      `,
      variables: {emailAddress, verificationCode},
    });
    return response.data!.verifyEmailAddress;
  }

  /**
   * Sends the user an email to verify their email address. An example use case
   * for this operation is when the user created an account (which caused an
   * email address verification email to be sent) but accidentally deleted the
   * email, and therefore requires it to be resent.
   * @throws {@link ConnectionError}
   * @throws {@link UnregisteredEmailAddressError}
   * @throws {@link EmailAddressVerifiedError}
   * @throws {@link InternalServerError}
   */
  async emailEmailAddressVerification(
    emailAddress: string,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation EmailEmailAddressVerification($emailAddress: String!) {
          emailEmailAddressVerification(emailAddress: $emailAddress)
        }
      `,
      variables: {emailAddress},
    });
    return response.data!.emailEmailAddressVerification;
  }

  /**
   * Used when the user wants to reset their password because they forgot it.
   * @param emailAddress The address to send the password reset email to.
   * @throws {@link ConnectionError}
   * @throws {@link UnregisteredEmailAddressError}
   * @throws {@link InternalServerError}
   * @see resetPassword Use this other operation once
   * @see updateAccount Use this if the user is logged in (i.e., you have an
   * access token), and wants to update their password.
   */
  async emailPasswordResetCode(emailAddress: string): Promise<Placeholder> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation EmailPasswordResetCode($emailAddress: String!) {
          emailPasswordResetCode(emailAddress: $emailAddress)
        }
      `,
      variables: {emailAddress},
    });
    return response.data!.emailPasswordResetCode;
  }

  /**
   * Updates the user's account. Only the non-`null` fields will be updated.
   * None of the updates will take place if even one of the fields were invalid.
   * If the user updates their email address to something other than their
   * current address, you must log them out because the current access token
   * will be invalid until they verify their new email address.
   *
   * If the user updates their email address, they'll be required to verify it
   * before their next login via an email which is sent to it. This means
   * they'll be locked out of their account if they provide an invalid address,
   * and will have to contact the service's admin to correctly update their
   * address. You could prevent this mistake by asking them to confirm their
   * address. For example, a UI could require the user to enter their email
   * address twice if they're updating it, and only allow the update to take
   * place if both the entered addresses match.
   * @throws {@link UnauthorizedError}
   * @throws {@link UsernameTakenError}
   * @throws {@link EmailAddressTakenError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   * @throws {@link UsernameScalarError}
   * @throws {@link PasswordScalarError}
   * @throws {@link NameScalarError}
   * @throws {@link BioScalarError}
   */
  async updateAccount(
    accessToken: string,
    update: AccountUpdate,
  ): Promise<Placeholder> {
    validateAccountUpdate(update);
    const {__typename, ...updateData} = update;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation UpdateAccount($update: AccountUpdate!) {
            updateAccount(update: $update)
          }
        `,
        variables: {update: updateData},
      },
      accessToken,
    );
    return response.data!.updateAccount;
  }

  /**
   * @returns If the password reset code was correct, the password has been
   * reset, and <true> will be returned. Otherwise, `false` will be returned.
   * @throws {@link ConnectionError}
   * @throws {@link UnregisteredEmailAddressError}
   * @throws {@link InternalServerError}
   */
  async resetPassword(
    emailAddress: string,
    passwordResetCode: number,
    newPassword: string,
  ): Promise<boolean> {
    const response = await queryOrMutate(this.protocol, this.apiUrl, {
      query: `
        mutation ResetPassword(
          $emailAddress: String!
          $passwordResetCode: Int!
          $newPassword: Password!
        ) {
          resetPassword(
            emailAddress: $emailAddress
            passwordResetCode: $passwordResetCode
            newPassword: $newPassword
          )
        }
      `,
      variables: {emailAddress, passwordResetCode, newPassword},
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
   * Deletes the user's account. All the user's data will be wiped from the
   * system. This means that users in private chats with the user will have
   * their chats deleted, etc.
   * @throws {@link CannotDeleteAccountError}
   * @throws {@link InternalServerError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   */
  async deleteAccount(accessToken: string): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteAccount {
            deleteAccount
          }
        `,
      },
      accessToken,
    );
    return response.data!.deleteAccount;
  }

  /**
   * Saves contacts. Previously saved contacts, nonexistent users, and the
   * user's own ID will be ignored.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createContacts(
    accessToken: string,
    idList: number[],
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateContacts($idList: [Int!]!) {
            createContacts(idList: $idList)
          }
        `,
        variables: {idList},
      },
      accessToken,
    );
    return response.data!.createContacts;
  }

  /**
   * Remove saved contacts. Invalid contacts (e.g., invalid user IDs, unsaved
   * contacts) will be ignored.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deleteContacts(
    accessToken: string,
    idList: number[],
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteContacts($idList: [Int!]!) {
            deleteContacts(idList: $idList)
          }
        `,
        variables: {idList},
      },
      accessToken,
    );
    return response.data!.deleteContacts;
  }

  /**
   * Blocks the specified user. Does nothing if they've already been blocked, or
   * the user is blocking themselves.
   * @throws {@link InvalidUserIdError}
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async blockUser(accessToken: string, id: number): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation BlockUser($id: Int!) {
            blockUser(id: $id)
          }
        `,
        variables: {id},
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
        variables: {id},
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
  async setOnline(
    accessToken: string,
    isOnline: boolean,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetOnline($isOnline: Boolean!) {
            setOnline(isOnline: $isOnline)
          }
        `,
        variables: {isOnline},
      },
      accessToken,
    );
    return response.data!.setOnline;
  }

  /**
   * Stars the message. The user can star their own messages. Starring an
   * already starred message does nothing.
   * @throws {@link InvalidMessageIdError}
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async star(accessToken: string, messageId: number): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation Star($messageId: Int!) {
            star(messageId: $messageId)
          }
        `,
        variables: {messageId},
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
  async deleteStar(
    accessToken: string,
    messageId: number,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteStar($messageId: Int!) {
            deleteStar(messageId: $messageId)
          }
        `,
        variables: {messageId},
      },
      accessToken,
    );
    return response.data!.deleteStar;
  }

  /**
   * Sets whether the user is typing in the chat.
   *
   * Let's consider an example use case. Once the user starts typing, the other
   * users in the chat will see a typing status on the user. Once the user stops
   * typing for more than two seconds, the typing status will be removed.
   * @throws {@link InvalidChatIdError}
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setTyping(
    accessToken: string,
    isTyping: boolean,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetTyping($isTyping: Boolean!) {
            setTyping(isTyping: $isTyping)
          }
        `,
        variables: {isTyping},
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
  async deleteGroupChatPic(
    accessToken: string,
    chatId: number,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteGroupChatPic($chatId: Int!) {
            deleteGroupChatPic(chatId: $chatId)
          }
        `,
        variables: {chatId},
      },
      accessToken,
    );
    return response.data!.deleteGroupChatPic;
  }

  /**
   * Records that the user received or read the message. If the status is
   * "read", and there's no "delivered" record, the delivery status will be
   * created. Nothing will happen if the status already exists.
   * @throws {@link InvalidMessageIdError} The message doesn't exist in a chat
   * the user is in, or the message is the user's own.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createStatus(
    accessToken: string,
    messageId: number,
    status: MessageStatus,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateStatus($messageId: Int!, $status: MessageStatus!) {
            createStatus(messageId: $messageId, status: $status)
          }
        `,
        variables: {messageId, status},
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
   * @throws {@link GroupChatTitleScalarError}
   */
  async updateGroupChatTitle(
    accessToken: string,
    chatId: number,
    title: GroupChatTitle,
  ): Promise<Placeholder> {
    validateGroupChatTitleScalar(title);
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation UpdateGroupChatTitle(
            $chatId: Int!
            $title: GroupChatTitle!
          ) {
            updateGroupChatTitle(chatId: $chatId, title: $title)
          }
        `,
        variables: {chatId, title},
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
   * @throws {@link GroupChatDescriptionScalarError}
   */
  async updateGroupChatDescription(
    accessToken: string,
    chatId: number,
    description: GroupChatDescription,
  ): Promise<Placeholder> {
    validateGroupChatDescriptionScalar(description);
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation UpdateGroupChatDescription(
            $chatId: Int!
            $description: GroupChatDescription!
          ) {
            updateGroupChatDescription(
              chatId: $chatId
              description: $description
            )
          }
        `,
        variables: {chatId, description},
      },
      accessToken,
    );
    return response.data!.updateGroupChatDescription;
  }

  /**
   * Users already in the chat, and nonexistent users will be ignored. Only an
   * admin can perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async addGroupChatUsers(
    accessToken: string,
    chatId: number,
    idList: number[],
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation AddGroupChatUsers($chatId: Int!, $idList: [Int!]!) {
            addGroupChatUsers(chatId: $chatId, idList: $idList)
          }
        `,
        variables: {chatId, idList},
      },
      accessToken,
    );
    return response.data!.addGroupChatUsers;
  }

  /**
   * Only an admin can perform this operation. Messages sent by, and polls voted
   * on, by removed users will remain. Users who aren't in the chat, and
   * nonexistent users will be ignored.
   * @throws {@link InvalidUserIdError} The user attempted to leave the chat but
   * they must first appoint another user as an admin because they're the last
   * admin of an otherwise nonempty chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async removeGroupChatUsers(
    accessToken: string,
    chatId: number,
    idList: number[],
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation RemoveGroupChatUsers($chatId: Int!, $idList: [Int!]!) {
            removeGroupChatUsers(chatId: $chatId, idList: $idList)
          }
        `,
        variables: {chatId, idList},
      },
      accessToken,
    );
    return response.data!.removeGroupChatUsers;
  }

  /**
   * Makes every user in the user ID list an admin of the chat. Users who aren't
   * in the chat, nonexistent users, and users who are already admins are
   * ignored. Only an admin can perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async makeGroupChatAdmins(
    accessToken: string,
    chatId: number,
    idList: number[],
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation MakeGroupChatAdmins($chatId: Int!, $idList: [Int!]!) {
            makeGroupChatAdmins(chatId: $chatId, idList: $idList)
          }
        `,
        variables: {chatId, idList},
      },
      accessToken,
    );
    return response.data!.makeGroupChatAdmins;
  }

  /**
   * Creates a group chat. The {@link GroupChatInput.userIdList} and
   * {@link GroupChatInput}.adminIdList} needn't contain the user's own ID, as
   * it's implicitly included. Nonexistent users are ignored.
   * @returns The created chat's ID.
   * @throws {@link InvalidAdminIdError} The {@link GroupChatInput.adminIdList}
   * wasn't a subset of the {@link GroupChatInput.userIdList}.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link GroupChatTitleScalarError}
   * @throws {@link GroupChatDescriptionScalarError}
   */
  async createGroupChat(
    accessToken: string,
    chat: GroupChatInput,
  ): Promise<number> {
    validateGroupChatInput(chat);
    const {__typename, ...input} = chat;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateGroupChat($chat: GroupChatInput!) {
            createGroupChat(chat: $chat)
          }
        `,
        variables: {chat: input},
      },
      accessToken,
    );
    return response.data!.createGroupChat;
  }

  /**
   * Sets whether the chat is a broadcast chat. The user must be an admin to
   * perform this operation.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setBroadcast(
    accessToken: string,
    chatId: number,
    isBroadcast: boolean,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetBroadcast($chatId: Int!, $isBroadcast: Boolean!) {
            setBroadcast(chatId: $chatId, isBroadcast: $isBroadcast)
          }
        `,
        variables: {chatId, isBroadcast},
      },
      accessToken,
    );
    return response.data!.setBroadcast;
  }

  /**
   * The user must be an admin to perform this operation.
   * @throws {@link InvalidChatIdError} The chat isn't a group chat, or the chat
   * is a chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async setInvitability(
    accessToken: string,
    chatId: number,
    isInvitable: boolean,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetInvitability($chatId: Int!, $isInvitable: Boolean!) {
            setInvitability(chatId: $chatId, isInvitable: $isInvitable)
          }
        `,
        variables: {chatId, isInvitable},
      },
      accessToken,
    );
    return response.data!.setInvitability;
  }

  /**
   * Joins the chat the invite code is for. Nothing will happen if the user is
   * already in the chat.
   * @throws {@link InvalidInviteCodeError} The invite code doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link UuidScalarError}
   */
  async joinGroupChat(
    accessToken: string,
    inviteCode: Uuid,
  ): Promise<Placeholder> {
    validateUuidScalar(inviteCode);
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation JoinGroupChat($inviteCode: Uuid!) {
            joinGroupChat(inviteCode: $inviteCode)
          }
        `,
        variables: {inviteCode},
      },
      accessToken,
    );
    return response.data!.joinGroupChat;
  }

  /**
   * Deletes a private chat.
   * @throws {@link InvalidChatIdError} The user isn't in the chat.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deletePrivateChat(
    accessToken: string,
    chatId: number,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeletePrivateChat($chatId: Int!) {
            deletePrivateChat(chatId: $chatId)
          }
        `,
        variables: {chatId},
      },
      accessToken,
    );
    return response.data!.deletePrivateChat;
  }

  /**
   * Creates a private chat with the user if the chat doesn't exist.
   * @returns The chat's ID.
   * @throws {@link InvalidUserIdError} The specified user doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createPrivateChat(
    accessToken: string,
    userId: number,
  ): Promise<number> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreatePrivateChat($userId: Int!) {
            createPrivateChat(userId: $userId)
          }
        `,
        variables: {userId},
      },
      accessToken,
    );
    return response.data!.createPrivateChat;
  }

  /**
   * Sends the text in the chat. If the chat is a broadcast chat, the user must
   * be an admin to message.
   * @throws {@link InvalidChatIdError} The user isn't in the chat.
   * @throws {@link InvalidMessageIdError} The context message doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link MessageTextScalarError}
   */
  async createTextMessage(
    accessToken: string,
    chatId: number,
    text: MessageText,
    contextMessageId?: ContextMessageId,
  ): Promise<Placeholder> {
    validateMessageTextScalar(text);
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateTextMessage(
            $chatId: Int!
            $text: MessageText!
            $contextMessageId: Int!
          ) {
            createTextMessage(
              chatId: $chatId
              text: $text
              contextMessageId: $contextMessageId
            )
          }
        `,
        variables: {chatId, text, contextMessageId},
      },
      accessToken,
    );
    return response.data!.createTextMessage;
  }

  /**
   * Sends the text in the chat. For example, a restaurant's bot asks if the
   * user wants a burger or a pizza in the text, and the actions are "burger"
   * and "pizza". If the chat is a broadcast chat, the user must be an admin to
   * message.
   *
   * A frontend UI could display this message like a regular text message but
   * with buttons below it. Action messages are meant for bots; human users
   * shouldn't be able to create them. Only the creator of the action message
   * will be notified when {@link triggerAction} gets called.
   * @throws {@link InvalidChatIdError} The user isn't in the chat.
   * @throws {@link InvalidActionError} Either there were zero actions or the
   * actions weren't unique.
   * @throws {@link InvalidMessageIdError} The context message doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link MessageTextScalarError}
   */
  async createActionMessage(
    accessToken: string,
    chatId: number,
    message: ActionMessageInput,
    contextMessageId?: ContextMessageId,
  ): Promise<Placeholder> {
    validateActionMessageInput(message);
    const {__typename, ...input} = message;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreateActionMessage(
            $chatId: Int!
            $message: ActionMessageInput!
            $contextMessageId: Int
          ) {
            createActionMessage(
              chatId: $chatId
              message: $message
              contextMessageId: $contextMessageId
            )
          }
        `,
        variables: {chatId, message: input, contextMessageId},
      },
      accessToken,
    );
    return response.data!.createActionMessage;
  }

  /**
   * Creates a {@link GroupChatInviteMessage} in the chat inviting users to
   * join. If the chat is a broadcast chat, the user must be an admin to
   * message. A frontend UI might want to hide the
   * {@link GroupChatInviteMessage.inviteCode}, and instead display the
   * {@link GroupChatInfo}.
   * @throws {@link InvalidChatIdError} The user isn't in the chat.
   * @throws {@link InvalidInvitedChatError} The invited chat ID isn't a group
   * chat, or the chat has invitations turned off.
   * @throws {@link InvalidMessageIdError} The context message doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async createGroupChatInviteMessage(
    accessToken: string,
    chatId: number,
    invitedChatId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
            mutation CreateGroupChatInviteMessage(
              $chatId: Int!
              $invitedChatId: Int!
              $contextMessageId: Int
            ) {
              createGroupChatInviteMessage(
                chatId: $chatId
                invitedChatId: $invitedChatId
                contextMessageId: $contextMessageId
              )
          }
        `,
        variables: {chatId, invitedChatId, contextMessageId},
      },
      accessToken,
    );
    return response.data!.createGroupChatInviteMessage;
  }

  /**
   * Sends the poll in the chat. If the chat is a broadcast chat, the user must
   * be an admin to message.
   * @throws {@link InvalidChatIdError} The user isn't in the chat.
   * @throws {@link InvalidMessageIdError} The context message doesn't exist.
   * @throws {@link InvalidPollError} There were less than two options, or an
   * option was blocked.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link MessageTextScalarError}
   */
  async createPollMessage(
    accessToken: string,
    chatId: number,
    poll: PollInput,
    contextMessageId?: ContextMessageId,
  ): Promise<Placeholder> {
    validatePollInput(poll);
    const {__typename, ...input} = poll;
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation CreatePollMessage(
            $chatId: Int!
            $poll: PollInput!
            $contextMessageId: Int
          ) {
            createPollMessage(
              chatId: $chatId
              poll: $poll
              contextMessageId: $contextMessageId
            )
          }
        `,
        variables: {chatId, poll: input, contextMessageId},
      },
      accessToken,
    );
    return response.data!.createPollMessage;
  }

  /**
   * Forwards the message to the chat. If the chat is a broadcast chat, the user
   * must be an admin to message.
   * @throws {@link InvalidChatIdError} The user isn't in the chat.
   * @throws {@link InvalidMessageIdError} Either the message or context message
   * didn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async forwardMessage(
    accessToken: string,
    chatId: number,
    messageId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation ForwardMessage(
            $chatId: Int!
            $messageId: Int!
            $contextMessageId: Int
          ) {
            forwardMessage(
              chatId: $chatId
              messageId: $messageId
              contextMessageId: $contextMessageId
            )
          }
        `,
        variables: {chatId, messageId, contextMessageId},
      },
      accessToken,
    );
    return response.data!.forwardMessage;
  }

  /**
   * Triggers the message's action.
   * @throws {@link InvalidMessageIdError} There's no such action message.
   * @throws {@link InvalidActionError} The action doesn't exist.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link MessageTextScalarError}
   */
  async triggerAction(
    accessToken: string,
    messageId: number,
    action: MessageText,
  ): Promise<Placeholder> {
    validateMessageTextScalar(action);
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation TriggerAction($messageId: Int!, $action: MessageText!) {
            triggerAction(messageId: $messageId, action: $action)
          }
        `,
        variables: {messageId, action},
      },
      accessToken,
    );
    return response.data!.triggerAction;
  }

  /**
   * Updates the user's vote for the option on the message's poll
   * @param vote If `true`, the user's vote will be added if it hasn't already.
   * If `false`, the user's vote will be removed if there is one.
   * @throws {@link InvalidMessageIdError} There's no such poll message.
   * @throws {@link NonexistentOptionError} The option isn't in the poll.
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   * @throws {@link MessageTextScalarError}
   */
  async setPollVote(
    accessToken: string,
    messageId: number,
    option: MessageText,
    vote: boolean,
  ): Promise<Placeholder> {
    validateMessageTextScalar(option);
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation SetPollVote(
            $messageId: Int!
            option: $MessageText!
            $vote: Boolean!
          ) {
            setPollVote(messageId: $messageId, option: $option, vote: $vote)
          }
        `,
        variables: {messageId, option, vote},
      },
      accessToken,
    );
    return response.data!.setPollVote;
  }

  /**
   * Deletes the message from the chat it's from. The user can only delete their
   * own messages.
   * @throws {@link InvalidMessageIdError} The message isn't in a chat the user
   * is in, the message isn't visible to the user because they deleted the
   * private chat, or the message isn't the user's own
   * @throws {@link InternalServerError}
   * @throws {@link ConnectionError}
   * @throws {@link UnauthorizedError}
   */
  async deleteMessage(
    accessToken: string,
    messageId: number,
  ): Promise<Placeholder> {
    const response = await queryOrMutate(
      this.protocol,
      this.apiUrl,
      {
        query: `
          mutation DeleteMessage($id: Int!) {
            deleteMessage(id: $id)
          }
        `,
        variables: {id: messageId},
      },
      accessToken,
    );
    return response.data!.deleteMessage;
  }
}
