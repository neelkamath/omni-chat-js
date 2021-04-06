/**
 * When the account's profile pic gets updated, an {@link UpdatedAccount} will be sent.
 *
 * A user will be automatically unblocked when they delete their account. In this scenario, an {@link UnblockedAccount}
 * will not be sent because it's a rare event, and the client would've had to deal with the user viewing a user who's
 * account was just deleted.
 */

export type AccountsSubscription =
  | CreatedSubscription
  | NewContact
  | UpdatedAccount
  | UpdatedProfilePic
  | DeletedContact
  | BlockedAccount
  | UnblockedAccount
  | DeletedAccount;

export type MessagesSubscription =
  | CreatedSubscription
  | NewTextMessage
  | NewActionMessage
  | NewPicMessage
  | NewAudioMessage
  | NewGroupChatInviteMessage
  | NewDocMessage
  | NewVideoMessage
  | NewPollMessage
  | UpdatedMessage
  | TriggeredAction
  | DeletedMessage
  | MessageDeletionPoint
  | DeletionOfEveryMessage
  | UserChatMessagesRemoval
  | UnstarredChat;

export type OnlineStatusesSubscription = CreatedSubscription | OnlineStatus;

export type TypingStatusesSubscription = CreatedSubscription | TypingStatus;

/**
 * A {@link GroupChatId} is the ID of the chat the user was added to.
 *
 * When a group chat's pic gets updated, an {@link UpdatedGroupChat} will be sent.
 *
 * If the subscriber leaves the chat, they will receive their own {@link ExitedUsers} message.
 */
export type GroupChatsSubscription =
  | CreatedSubscription
  | GroupChatId
  | UpdatedGroupChat
  | UpdatedGroupChatPic
  | ExitedUsers;

export type Uuid = string;

/**
 * GraphQL mandates data be returned for every operation, and data be present in every type. However, certain operations
 * and types don't have relevant data. This type, which is an empty string, indicates such.
 */
export type Placeholder = '';

/** A unique identifier which isn't intended to be human-readable. */
export type ID = string;

/** Complies with ISO 8601. */
export type DateTime = string;

/** A cursor for pagination. */
export type Cursor = string;

/**
 * A username must be 1-30 characters long. Only lowercase English letters (a-z), English numbers (0-9), periods, and
 * underscores are allowed.
 */
export type Username = string;

/** A name must neither contain whitespace nor exceed 30 characters. */
export type Name = string;

/**
 * A user's bio which cannot exceed 2,500 characters, disallows leading and trailing whitespace, and uses GitHub
 * Flavored Markdown.
 */
export type Bio = string;

/** A password which contains non-whitespace characters.*/
export type Password = string;

/** 1-70 characters, of which at least one isn't whitespace. Leading and trailing whitespace is disallowed. */
export type GroupChatTitle = string;

/** At most 1,000 characters, disallows leading and trailing whitespace, and uses GitHub Flavored Markdown. */
export type GroupChatDescription = string;

/**
 * 1-10,000 characters, of which at least one isn't whitespace. Uses GitHub Flavored Markdown. Leading and trailing
 * whitespace is disallowed.
 */
export type MessageText = string;

/**
 * Indicates that the GraphQL subscription has been created. This will only be sent only once, and will be the first
 * event sent.
 */
export interface CreatedSubscription {
  readonly __typename: 'CreatedSubscription';
  readonly placeholder: Placeholder;
}

/** The {@link id} of the user who deleted their account. */
export interface DeletedAccount {
  readonly __typename: 'DeletedAccount';
  readonly id: number;
}

/** Only non-`null` fields will be updated. */
export interface AccountUpdate {
  readonly __typename: 'AccountUpdate';
  readonly username: Username | null;
  readonly password: Password | null;
  readonly emailAddress: string | null;
  readonly firstName: Name | null;
  readonly lastName: Name | null;
  readonly bio: Bio | null;
}

/** The server will use an empty string for fields which are `undefined`. */
export interface AccountInput {
  readonly __typename: 'AccountInput';
  readonly username: Username;
  readonly password: Password;
  readonly emailAddress: string;
  readonly firstName?: Name;
  readonly lastName?: Name;
  readonly bio?: Bio;
}

export interface Login {
  readonly __typename: 'Login';
  readonly username: Username;
  readonly password: Password;
}

export interface TokenSet {
  readonly __typename: 'TokenSet';
  readonly accessToken: ID;
  readonly refreshToken: ID;
}

export interface Account extends AccountData {
  readonly __typename: 'Account';
  readonly id: number;
  readonly username: Username;
  readonly emailAddress: string;
  readonly firstName: Name;
  readonly lastName: Name;
  readonly bio: Bio;
}

export interface AccountsConnection {
  readonly __typename: 'AccountsConnection';
  readonly edges: AccountEdge[];
  readonly pageInfo: PageInfo;
}

export interface AccountEdge {
  readonly __typename: 'AccountEdge';
  readonly node: Account;
  readonly cursor: Cursor;
}

export interface PageInfo {
  readonly __typename: 'PageInfo';
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor: Cursor | null;
  readonly endCursor: Cursor | null;
}

/** The {@link id} of the user who updated their profile pic. */
export interface UpdatedProfilePic {
  readonly __typename: 'UpdatedProfilePic';
  readonly id: number;
}

export interface AccountData {
  readonly __typename: 'Account' | 'BlockedAccount' | 'NewContact';
  readonly id: number;
  readonly username: Username;
  readonly emailAddress: string;
  readonly firstName: Name;
  readonly lastName: Name;
  readonly bio: Bio;
}

export interface NewContact extends AccountData {
  readonly __typename: 'NewContact';
  readonly id: number;
  readonly username: Username;
  readonly emailAddress: string;
  readonly firstName: Name;
  readonly lastName: Name;
  readonly bio: Bio;
}

/** `undefined` fields correspond to the field not existing. This will not be sent if the pic has been updated. */
export interface UpdatedAccount {
  readonly __typename: 'UpdatedAccount';
  readonly id: number;
  readonly username: Username;
  readonly emailAddress: string;
  readonly firstName: Name;
  readonly lastName: Name;
  readonly bio: Bio;
}

/**
 * The {@link id} of the contact which has been deleted for the user. This happens when the user deletes a contact, or
 * the contact's account gets deleted.
 */
export interface DeletedContact {
  readonly __typename: 'DeletedContact';
  readonly id: number;
}

/** The user blocked the {@link userId}. */
export interface BlockedAccount extends AccountData {
  readonly __typename: 'BlockedAccount';
  readonly id: number;
  readonly username: Username;
  readonly emailAddress: string;
  readonly firstName: Name;
  readonly lastName: Name;
  readonly bio: Bio;
}

/** The user unblocked the {@link userId}. */
export interface UnblockedAccount {
  readonly __typename: 'UnblockedAccount';
  readonly id: number;
}

export interface Chat {
  readonly __typename: 'PrivateChat' | 'GroupChat';
  readonly id: number;
  readonly messages: MessagesConnection;
}

export interface MessagesConnection {
  readonly __typename: 'MessagesConnection';
  readonly edges: MessageEdge[];
  readonly pageInfo: PageInfo;
}

export interface MessageEdge {
  readonly __typename: 'MessageEdge';
  readonly node: Message;
  readonly cursor: Cursor;
}

/** The {@link id} of the group chat whose pic was updated. */
export interface UpdatedGroupChatPic {
  readonly __typename: 'UpdatedGroupChatPic';
  readonly id: number;
}

export interface Message {
  readonly __typename:
    | 'TextMessage'
    | 'ActionMessage'
    | 'PicMessage'
    | 'PollMessage'
    | 'AudioMessage'
    | 'GroupChatInviteMessage'
    | 'DocMessage'
    | 'VideoMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
}

export type MessageStatus = 'DELIVERED' | 'READ';

/**
 * - `'SENT'` indicates that each user in the chat hasn't had the message delivered to them yet.
 * - `'DELIVERED'` indicates that each user in the chat has had the message delivered to them but not everyone has read
 * it yet.
 * - `'READ'` indicates that each user in the chat has read the message.
 */
export type MessageState = 'SENT' | 'DELIVERED' | 'READ';

/** The {@link users} who are typing in the {@link chatId}. */
export interface TypingUsers {
  readonly __typename: 'TypingUsers';
  readonly chatId: number;
  readonly users: Account[];
}

/** The username doesn't exist. */
export interface NonexistentUser {
  readonly __typename: 'NonexistentUser';
  readonly placeholder: Placeholder;
}

export interface UnverifiedEmailAddress {
  readonly __typename: 'UnverifiedEmailAddress';
  readonly placeholder: Placeholder;
}

/** The email address is already verified. */
export interface EmailAddressVerified {
  readonly __typename: 'EmailAddressVerified';
  readonly placeholder: Placeholder;
}

export interface UsernameTaken {
  readonly __typename: 'UsernameTaken';
  readonly placeholder: Placeholder;
}

export interface IncorrectPassword {
  readonly __typename: 'IncorrectPassword';
  readonly placeholder: Placeholder;
}

export interface EmailAddressTaken {
  readonly __typename: 'EmailAddressTaken';
  readonly placeholder: Placeholder;
}

export interface InvalidChatId {
  readonly __typename: 'InvalidChatId';
  readonly placeholder: Placeholder;
}

export interface InvalidAdminId {
  readonly __typename: 'InvalidAdminId';
  readonly placeholder: Placeholder;
}

export interface UnregisteredEmailAddress {
  readonly __typename: 'UnregisteredEmailAddress';
  readonly placeholder: Placeholder;
}

export interface InvalidUserId {
  readonly __typename: 'InvalidUserId';
  readonly placeholder: Placeholder;
}

export interface InvalidMessageId {
  readonly __typename: 'InvalidMessageId';
  readonly placeholder: Placeholder;
}

/**
 * The only reason the account cannot be deleted is if the user is the only admin of a group chat containing users other
 * than themselves. In this case, they must first appoint a different user as an admin.
 */
export interface CannotDeleteAccount {
  readonly __typename: 'CannotDeleteAccount';
  readonly placeholder: Placeholder;
}

/** There were fewer than two options, or an option was duplicated. */
export interface InvalidPoll {
  readonly __typename: 'InvalidPoll';
  readonly placeholder: Placeholder;
}

/** The option isn't in the poll. */
export interface NonexistentOption {
  readonly __typename: 'NonexistentOption';
  readonly placeholder: Placeholder;
}

export interface InvalidInviteCode {
  readonly __typename: 'InvalidInviteCode';
  readonly placeholder: Placeholder;
}

/** Either the invited isn't a group chat or the chat has turned off invitations. */
export interface InvalidInvitedChat {
  readonly __typename: 'InvalidInvitedChat';
  readonly placeholder: Placeholder;
}

/**
 * This Omni Chat instance disallows the provided email address's domain. For example, `"john.doe@private.company.com"`
 * may be allowed, but not `"john.doe@gmail.com"`.
 */
export interface InvalidDomain {
  readonly __typename: 'InvalidDomain';
  readonly placeholder: Placeholder;
}

export interface InvalidAction {
  readonly __typename: 'InvalidAction';
  readonly placeholder: Placeholder;
}

export interface MessageEdges {
  readonly __typename: 'MessageEdges';
  readonly edges: MessageEdge[];
}

export interface InvalidVerificationCode {
  readonly __typename: 'InvalidVerificationCode';
  readonly placeholder: Placeholder;
}

export interface InvalidPasswordResetCode {
  readonly __typename: 'InvalidPasswordResetCode';
  readonly placeholder: Placeholder;
}

export interface CreatedChatId {
  readonly __typename: 'CreatedChatId';
  readonly id: number;
}

export type SearchChatMessagesResult = MessageEdges | InvalidChatId;

export type ReadChatResult = PrivateChat | GroupChat | InvalidChatId;

export type ReadGroupChatResult = GroupChatInfo | InvalidInviteCode;

export type RequestTokenSetResult = TokenSet | NonexistentUser | UnverifiedEmailAddress | IncorrectPassword;

export type VerifyEmailAddressResult = InvalidVerificationCode | UnregisteredEmailAddress;

export type ResetPasswordResult = InvalidPasswordResetCode | UnregisteredEmailAddress;

export type UpdateAccountResult = UsernameTaken | EmailAddressTaken;

export type CreateAccountResult = UsernameTaken | EmailAddressTaken | InvalidDomain;

export type EmailEmailAddressVerificationResult = UnregisteredEmailAddress | EmailAddressVerified;

export type CreateGroupChatResult = CreatedChatId | InvalidAdminId;

export type CreatePrivateChatResult = CreatedChatId | InvalidUserId;

export type CreateTextMessageResult = InvalidChatId | InvalidMessageId;

export type CreateActionMessageResult = InvalidChatId | InvalidAction | InvalidMessageId;

export type CreateGroupChatInviteMessageResult = InvalidChatId | InvalidInvitedChat | InvalidMessageId;

export type CreatePollMessageResult = InvalidChatId | InvalidMessageId | InvalidPoll;

export type ForwardMessageResult = InvalidChatId | InvalidMessageId;

export type TriggerActionResult = InvalidMessageId | InvalidAction;

export type SetPollVoteResult = InvalidMessageId | NonexistentOption;

export type LeaveGroupChatResult = InvalidChatId | CannotLeaveChat;

export type ReadOnlineStatusResult = OnlineStatus | InvalidUserId;

/**
 * The user attempted to leave the chat but they must first appoint another user as an admin because they're the last
 * admin of an otherwise nonempty chat.
 */
export interface CannotLeaveChat {
  readonly __typename: 'CannotLeaveChat';
  readonly placeholder: Placeholder;
}

/** An existing {@link messageId} in the {@link chatId} which has been updated. */
export interface UpdatedMessage {
  readonly __typename: 'UpdatedMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly state: MessageState;
  readonly statuses: MessageDateTimeStatus[];
  readonly hasStar: boolean;
}

/** Every message in the chat has been unstarred by the user. */
export interface UnstarredChat {
  readonly __typename: 'UnstarredChat';
  readonly id: number;
}

/** The {@link dateTime} the {@link user} created the {@link status}. */
export interface MessageDateTimeStatus {
  readonly __typename: 'MessageDateTimeStatus';
  readonly user: Account;
  readonly dateTime: DateTime;
  readonly status: MessageStatus;
}

export interface MessageContext {
  readonly __typename: 'MessageContext';
  /** Whether this message was in reply to a particular message. */
  readonly hasContext: boolean;
  /**
   * The ID of the context message.
   *
   * If this message doesn't {@link hasContext}, this will be `null`. If this message {@link hasContext}`, this will be
   * `null` only if the context message was deleted. Since this message might not make any sense without the context, if
   * this message {@link hasContext}, but the context message was deleted, a frontend could replace what should've been
   * the context message with something similar to `"Message deleted"`.
   */
  readonly id: number | null;
}

export interface PrivateChat extends Chat {
  readonly __typename: 'PrivateChat';
  readonly id: number;
  readonly messages: MessagesConnection;
  /** The user being chatted with. */
  readonly user: Account;
}

export interface GroupChat extends Chat, BareGroupChat {
  readonly __typename: 'GroupChat';
  readonly id: number;
  readonly title: GroupChatTitle;
  readonly description: GroupChatDescription;
  readonly adminIdList: number[];
  readonly users: AccountsConnection;
  readonly messages: MessagesConnection;
  readonly isBroadcast: boolean;
  readonly publicity: GroupChatPublicity;
  /** `null` if invite codes are switched off. */
  readonly inviteCode: Uuid | null;
}

/**
 * - `'NOT_INVITABLE'` indicates that users cannot join the chat via an invite code.
 * - `'INVITABLE'` indicates that users can join the chat via an invite code.
 * - `'PUBLIC'` indicates that people can search for, and view public chats without an account. Invite codes are
 * permanently switched on. Anyone with an account can join a public chat. A frontend UI may allow for a search engine
 * to index the chat should the administrator allow for it. A chat must be made public when it's being created because
 * chats can't switch between being public after they've been created.
 */
export type GroupChatPublicity = 'NOT_INVITABLE' | 'INVITABLE' | 'PUBLIC';

export interface BareGroupChat {
  readonly __typename: 'GroupChatInfo' | 'GroupChat';
  readonly title: GroupChatTitle;
  readonly description: GroupChatDescription;
  /** The ID of the {@link users} who are the admins. There will be at least one admin. */
  readonly adminIdList: number[];
  readonly users: AccountsConnection;
  readonly isBroadcast: boolean;
  readonly publicity: GroupChatPublicity;
}

/**
 * The {@link action} on the action {@link messageId} which was {@link triggeredBy} the user. This will only be sent to
 * the user who created the action message.
 */
export interface TriggeredAction {
  readonly __typename: 'TriggeredAction';
  readonly messageId: number;
  readonly action: MessageText;
  readonly triggeredBy: Account;
}

export interface OnlineStatus {
  readonly __typename: 'OnlineStatus';
  readonly userId: number;
  readonly isOnline: boolean;
  /** `null` if the {@link userId} has never set an online status. */
  readonly lastOnline: DateTime | null;
}

/** Whether the {@link userId} {@link isTyping} in the {@link chatId}. */
export interface TypingStatus {
  readonly __typename: 'TypingStatus';
  readonly chatId: number;
  readonly userId: number;
  readonly isTyping: boolean;
}

export interface GroupChatId {
  readonly __typename: 'GroupChatId';
  readonly id: number;
}

/** The users who left the group chat. */
export interface ExitedUsers {
  readonly __typename: 'ExitedUsers';
  readonly chatId: number;
  readonly userIdList: number[];
}

/**
 * `null` fields haven't been updated. If a non-`null` field hasn't been updated, its value will be the same as before.
 * This will not be sent if the pic has been updated.
 */
export interface UpdatedGroupChat {
  readonly __typename: 'UpdatedGroupChat';
  readonly chatId: number;
  readonly title: GroupChatTitle | null;
  readonly description: GroupChatDescription | null;
  readonly newUsers: Account[] | null;
  readonly removedUsers: Account[] | null;
  readonly adminIdList: number[] | null;
  readonly isBroadcast: boolean | null;
  readonly publicity: GroupChatPublicity | null;
}

/**
 * Every message in the {@link chatId} has been deleted.
 *
 * This happens in private chats when the user deleted it, or the other user deleted their account. This happens in
 * group chats when the last user left the chat.
 */
export interface DeletionOfEveryMessage {
  readonly __typename: 'DeletionOfEveryMessage';
  readonly chatId: number;
}

/**
 * Every message the {@link userId} sent in the {@link chatId} has been deleted. This happens when a group chat's member
 * deletes their account.
 */
export interface UserChatMessagesRemoval {
  readonly __typename: 'UserChatMessagesRemoval';
  readonly chatId: number;
  readonly userId: number;
}

/** Indicates that the every message {@link until} the {@link DateTime} has been deleted in the {@link chatId}. */
export interface MessageDeletionPoint {
  readonly __typename: 'MessageDeletionPoint';
  readonly chatId: number;
  readonly until: DateTime;
}

/** The {@link messageId} has been deleted from the {@link chatId}. */
export interface DeletedMessage {
  readonly __typename: 'DeletedMessage';
  readonly chatId: number;
  readonly messageId: number;
}

export interface PollInput {
  readonly __typename: 'PollInput';
  /** For example, `'Where should we meet?'`. */
  readonly title: MessageText;
  /** There must be at least two options. Each option must be unique. For example, `['Burger King', 'Pizza Hut']`. */
  readonly options: MessageText[];
}

export interface PollOption {
  readonly __typename: 'PollOption';
  readonly option: MessageText;
  /** The ID of every user who voted for this. */
  readonly votes: number[];
}

/** A user can vote for each option at most once, but can vote for multiple options. */
export interface Poll {
  readonly __typename: 'Poll';
  readonly title: MessageText;
  /** There are at least two options, each of which are unique. */
  readonly options: PollOption[];
}

export interface ActionMessageInput {
  readonly __typename: 'ActionMessageInput';
  /** For example, `'What would you like to order?'`. */
  readonly text: MessageText;
  /** There must be at least one action. Each action must be unique. For example, `['Pizza', 'Burger']`. */
  readonly actions: MessageText[];
}

export interface ActionableMessage {
  readonly __typename: 'ActionableMessage';
  readonly text: MessageText;
  /** There's at least one action. Each action is unique. */
  readonly actions: MessageText[];
}

export interface ChatMessages {
  readonly __typename: 'ChatMessages';
  readonly chat: Chat;
  readonly messages: MessageEdge[];
}

export interface GroupChatInfo extends BareGroupChat {
  readonly __typename: 'GroupChatInfo';
  readonly title: GroupChatTitle;
  readonly description: GroupChatDescription;
  readonly adminIdList: number[];
  readonly users: AccountsConnection;
  readonly isBroadcast: boolean;
  readonly publicity: GroupChatPublicity;
}

export interface TextMessage extends Message {
  readonly __typename: 'TextMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
  readonly textMessage: MessageText;
}

export interface ActionMessage extends Message {
  readonly __typename: 'ActionMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
  readonly actionableMessage: ActionableMessage;
}

export interface PicMessage extends Message {
  readonly __typename: 'PicMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
  readonly caption: MessageText | null;
}

export interface PollMessage extends Message {
  readonly __typename: 'PollMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
  readonly poll: Poll;
}

export interface AudioMessage extends Message {
  readonly __typename: 'AudioMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
}

export interface GroupChatInviteMessage extends Message {
  readonly __typename: 'GroupChatInviteMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
  readonly inviteCode: Uuid;
}

export interface DocMessage extends Message {
  readonly __typename: 'DocMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
}

export interface VideoMessage extends Message {
  readonly __typename: 'VideoMessage';
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly hasStar: boolean;
}

/** The message which the user starred. */
export interface StarredMessage {
  readonly __typename:
    | 'StarredTextMessage'
    | 'StarredActionMessage'
    | 'StarredPicMessage'
    | 'StarredPollMessage'
    | 'StarredAudioMessage'
    | 'StarredGroupChatInviteMessage'
    | 'StarredDocMessage'
    | 'StarredVideoMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface StarredTextMessage extends StarredMessage {
  readonly __typename: 'StarredTextMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly textMessage: MessageText;
}

export interface StarredActionMessage extends StarredMessage {
  readonly __typename: 'StarredActionMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly actionableMessage: ActionableMessage;
}

export interface StarredPicMessage extends StarredMessage {
  readonly __typename: 'StarredPicMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly caption: MessageText | null;
}

export interface StarredPollMessage extends StarredMessage {
  readonly __typename: 'StarredPollMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly poll: Poll;
}

export interface StarredAudioMessage extends StarredMessage {
  readonly __typename: 'StarredAudioMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface StarredGroupChatInviteMessage extends StarredMessage {
  readonly __typename: 'StarredGroupChatInviteMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly inviteCode: Uuid;
}

export interface StarredDocMessage extends StarredMessage {
  readonly __typename: 'StarredDocMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface StarredVideoMessage extends StarredMessage {
  readonly __typename: 'StarredVideoMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly statuses: MessageDateTimeStatus[];
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface NewMessage {
  readonly __typename:
    | 'NewTextMessage'
    | 'NewActionMessage'
    | 'NewPicMessage'
    | 'NewPollMessage'
    | 'NewAudioMessage'
    | 'NewGroupChatInviteMessage'
    | 'NewDocMessage'
    | 'NewVideoMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface NewTextMessage extends NewMessage {
  readonly __typename: 'NewTextMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly textMessage: MessageText;
}

export interface NewActionMessage extends NewMessage {
  readonly __typename: 'NewActionMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly actionableMessage: ActionableMessage;
}

export interface NewPicMessage extends NewMessage {
  readonly __typename: 'NewPicMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly caption: MessageText | null;
}

export interface NewPollMessage extends NewMessage {
  readonly __typename: 'NewPollMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly poll: Poll;
}

export interface NewAudioMessage extends NewMessage {
  readonly __typename: 'NewAudioMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface NewGroupChatInviteMessage extends NewMessage {
  readonly __typename: 'NewGroupChatInviteMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
  readonly inviteCode: Uuid;
}

export interface NewDocMessage extends NewMessage {
  readonly __typename: 'NewDocMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface NewVideoMessage extends NewMessage {
  readonly __typename: 'NewVideoMessage';
  readonly chatId: number;
  readonly messageId: number;
  readonly sender: Account;
  readonly state: MessageState;
  readonly sent: DateTime;
  readonly context: MessageContext;
  readonly isForwarded: boolean;
}

export interface GroupChatInput {
  readonly __typename: 'GroupChatInput';
  readonly title: GroupChatTitle;
  readonly description: GroupChatDescription;
  readonly userIdList: number[];
  readonly adminIdList: number[];
  readonly isBroadcast: boolean;
  readonly publicity: GroupChatPublicity;
}

export interface StarredMessagesConnection {
  readonly edges: StarredMessageEdge[];
  readonly pageInfo: PageInfo;
}

export interface StarredMessageEdge {
  readonly node: StarredMessage;
  readonly cursor: Cursor;
}

export interface ChatMessagesConnection {
  readonly edges: ChatMessagesEdge[];
  readonly pageInfo: PageInfo;
}

export interface ChatMessagesEdge {
  readonly node: ChatMessages;
  readonly cursor: Cursor;
}

export interface ChatsConnection {
  readonly edges: ChatEdge[];
  readonly pageInfo: PageInfo;
}

export interface ChatEdge {
  readonly node: Chat;
  readonly cursor: Cursor;
}

export interface GroupChatsConnection {
  readonly edges: GroupChatEdge[];
  readonly pageInfo: PageInfo;
}

export interface GroupChatEdge {
  readonly node: GroupChat;
  readonly cursor: Cursor;
}
