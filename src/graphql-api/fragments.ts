export const CREATED_SUBSCRIPTION_FRAGMENT = `
  ... on CreatedSubscription {
    __typename
    placeholder
  }
`;

export const ACTIONABLE_MESSAGE_FRAGMENT = `
  ... on ActionableMessage {
    __typename
    text
    actions
  }
`;

export const NEW_CONTACT_FRAGMENT = `
  ... on NewContact {
    __typename
    id
    username
    emailAddress
    firstName
    lastName
    bio
  }
`;

export const UPDATED_ACCOUNT_FRAGMENT = `
  ... on UpdatedAccount {
    __typename
    id
    username
    emailAddress
    firstName
    lastName
    bio
  }
`;

export const DELETED_CONTACT_FRAGMENT = `
  ... on DeletedContact {
    __typename
    id
  }
`;

export const BLOCKED_ACCOUNT_FRAGMENT = `
  ... on BlockedAccount {
    __typename
    id
    username
    emailAddress
    firstName
    lastName
    bio
  }
`;

export const UNBLOCKED_ACCOUNT_FRAGMENT = `
  ... on UnblockedAccount {
    __typename
    id
  }
`;

export const TOKEN_SET_FRAGMENT = `
  ... on TokenSet {
    __typename
    accessToken
    refreshToken
  }
`;

export const ACCOUNT_FRAGMENT = `
  ... on Account {
    __typename
    id
    username
    emailAddress
    firstName
    lastName
    bio
  }
`;

export const ACCOUNT_EDGE_FRAGMENT = `
  ... on AccountEdge {
    __typename
    node {
      ${ACCOUNT_FRAGMENT}
    }
    cursor
  }
`;

export const PAGE_INFO_FRAGMENT = `
  ... on PageInfo {
    __typename
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export const ACCOUNTS_CONNECTION_FRAGMENT = `
  ... on AccountsConnection {
    __typename
    edges {
      ${ACCOUNT_EDGE_FRAGMENT}
    }
    pageInfo {
      ${PAGE_INFO_FRAGMENT}
    }
  }
`;

export const MESSAGE_DATE_TIME_STATUS_FRAGMENT = `
  ... on MessageDateTimeStatus {
    __typename
    user {
      ${ACCOUNT_FRAGMENT}
    }
    dateTime
    status
  }
`;

export const MESSAGE_CONTEXT_FRAGMENT = `
  ... on MessageContext {
    __typename
    hasContext
    id
  }
`;

export const TEXT_MESSAGE_FRAGMENT = `
  ... on TextMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
    textMessage
  }
`;

export const ACTION_MESSAGE_FRAGMENT = `
  ... on ActionMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
    actionableMessage {
      ${ACTIONABLE_MESSAGE_FRAGMENT}
    }
  }
`;

export const AUDIO_MESSAGE_FRAGMENT = `
  ... on AudioMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
  }
`;

export const GROUP_CHAT_INFO_FRAGMENT = `
  ... on GroupChatInfo {
    __typename
    title
    description
    adminIdList
    users {
      ${ACCOUNTS_CONNECTION_FRAGMENT}
    }
    isBroadcast
    publicity
  }
`;

export const GROUP_CHAT_INVITE_MESSAGE_FRAGMENT = `
  ... on GroupChatInviteMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
    inviteCode
  }
`;

export const DOC_MESSAGE_FRAGMENT = `
  ... on DocMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
  }
`;

export const VIDEO_MESSAGE_FRAGMENT = `
  ... on VideoMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
  }
`;

export const PIC_MESSAGE_FRAGMENT = `
  ... on PicMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
    caption
  }
`;

export const POLL_OPTION_FRAGMENT = `
  ... on PollOption {
    __typename
    option
    votes
  }
`;

export const POLL_FRAGMENT = `
  ... on Poll {
    __typename
    title
    options {
      ${POLL_OPTION_FRAGMENT}
    }
  }
`;

export const POLL_MESSAGE_FRAGMENT = `
  ... on PollMessage {
    __typename
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    hasStar
    poll {
      ${POLL_FRAGMENT}
    }
  }
`;

export const MESSAGE_FRAGMENT = `
  ${TEXT_MESSAGE_FRAGMENT}
  ${ACTION_MESSAGE_FRAGMENT}
  ${AUDIO_MESSAGE_FRAGMENT}
  ${GROUP_CHAT_INVITE_MESSAGE_FRAGMENT}
  ${DOC_MESSAGE_FRAGMENT}
  ${VIDEO_MESSAGE_FRAGMENT}
  ${PIC_MESSAGE_FRAGMENT}
  ${POLL_MESSAGE_FRAGMENT}
`;

export const MESSAGE_EDGE_FRAGMENT = `
  ... on MessageEdge {
    __typename
    node {
      ${MESSAGE_FRAGMENT}
    }
    cursor
  }
`;

export const MESSAGES_CONNECTION_FRAGMENT = `
  ... on MessagesConnection {
    __typename
    edges {
      ${MESSAGE_EDGE_FRAGMENT}
    }
    pageInfo {
      ${PAGE_INFO_FRAGMENT}
    }
  }
`;

export const PRIVATE_CHAT_FRAGMENT = `
  ... on PrivateChat {
    __typename
    id
    messages(last: $privateChat_messages_last, before: $privateChat_messages_before) {
      ${MESSAGES_CONNECTION_FRAGMENT}
    }
    user {
      ${ACCOUNT_FRAGMENT}
    }
  }
`;

export const TYPING_STATUS_FRAGMENT = `
  ... on TypingStatus {
    __typename
    chatId
    userId
    isTyping
  }
`;

export const UPDATED_PROFILE_PIC_FRAGMENT = `
  ... on UpdatedProfilePic {
    __typename
    id
  }
`;

export const UPDATED_GROUP_CHAT_PIC_FRAGMENT = `
  ... on UpdatedGroupChatPic {
    __typename
    id
  }
`;

export const TYPING_STATUSES_SUBSCRIPTION_FRAGMENT = `
  ${CREATED_SUBSCRIPTION_FRAGMENT}
  ${TYPING_STATUS_FRAGMENT}
`;

export const NEW_TEXT_MESSAGE_FRAGMENT = `
  ... on NewTextMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    textMessage
  }
`;

export const NEW_ACTION_MESSAGE_FRAGMENT = `
  ... on NewActionMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    actionableMessage {
      ${ACTIONABLE_MESSAGE_FRAGMENT}
    }
  }
`;

export const NEW_PIC_MESSAGE_FRAGMENT = `
  ... on NewPicMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    caption
  }
`;

export const NEW_AUDIO_MESSAGE_FRAGMENT = `
  ... on NewAudioMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
  }
`;

export const NEW_GROUP_CHAT_INVITE_MESSAGE_FRAGMENT = `
  ... on NewGroupChatInviteMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    inviteCode
  }
`;

export const NEW_DOC_MESSAGE_FRAGMENT = `
  ... on NewDocMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
  }
`;

export const NEW_VIDEO_MESSAGE_FRAGMENT = `
  ... on NewVideoMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
  }
`;

export const NEW_POLL_MESSAGE_FRAGMENT = `
  ... on NewPollMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    poll {
      ${POLL_FRAGMENT}
    }
  }
`;

export const TRIGGERED_ACTION_FRAGMENT = `
  ... on TriggeredAction {
    __typename
    messageId
    action
    triggeredBy {
      ${ACCOUNT_FRAGMENT}
    }
  }
`;

export const DELETED_MESSAGE_FRAGMENT = `
  ... on DeletedMessage {
    __typename
    chatId
    messageId
  }
`;

export const MESSAGE_DELETION_POINT_FRAGMENT = `
  ... on MessageDeletionPoint {
    __typename
    chatId
    until
  }
`;

export const DELETION_OF_EVERY_MESSAGE_FRAGMENT = `
  ... on DeletionOfEveryMessage {
    __typename
    chatId
  }
`;

export const USER_CHAT_MESSAGES_REMOVAL_FRAGMENT = `
  ... on UserChatMessagesRemoval {
    __typename
    chatId
    userId
  }
`;

export const GROUP_CHAT_ID_FRAGMENT = `
  ... on GroupChatId {
    __typename
    id
  }
`;

export const UPDATED_GROUP_CHAT_FRAGMENT = `
  ... on UpdatedGroupChat {
    __typename
    chatId
    title
    description
    newUsers {
      ${ACCOUNT_FRAGMENT}
    }
    removedUsers {
      ${ACCOUNT_FRAGMENT}
    }
    adminIdList
    isBroadcast
    publicity
  }
`;

export const EXITED_USERS_FRAGMENT = `
  ... on ExitedUsers {
    __typename
    chatId
    userIdList
  }
`;

export const GROUP_CHATS_SUBSCRIPTION_FRAGMENT = `
  ${CREATED_SUBSCRIPTION_FRAGMENT}
  ${GROUP_CHAT_ID_FRAGMENT}
  ${UPDATED_GROUP_CHAT_PIC_FRAGMENT}
  ${UPDATED_GROUP_CHAT_FRAGMENT}
  ${EXITED_USERS_FRAGMENT}
`;

export const GROUP_CHAT_FRAGMENT = `
  ... on GroupChat {
    __typename
    id
    title
    description
    adminIdList
    users(first: $groupChat_users_first, after: $groupChat_users_after) {
      ${ACCOUNTS_CONNECTION_FRAGMENT}
    }
    messages(last: $groupChat_messages_last, before: $groupChat_messages_before) {
      ${MESSAGES_CONNECTION_FRAGMENT}
    }
    isBroadcast
    publicity
    inviteCode
  }
`;

export const CHAT_FRAGMENT = `
  ${PRIVATE_CHAT_FRAGMENT}
  ${GROUP_CHAT_FRAGMENT}
`;

export const ONLINE_STATUS_FRAGMENT = `
  ... on OnlineStatus {
    __typename
    userId
    isOnline
    lastOnline
  }
`;

export const CHAT_MESSAGES_FRAGMENT = `
  ... on ChatMessages {
    __typename
    chat {
      ${CHAT_FRAGMENT}
    }
    messages {
      ${MESSAGE_EDGE_FRAGMENT}
    }
  }
`;

export const STARRED_TEXT_MESSAGE_FRAGMENT = `
  ... on StarredTextMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    textMessage
  }
`;

export const STARRED_ACTION_MESSAGE_FRAGMENT = `
  ... on StarredActionMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    actionableMessage {
      ${ACTIONABLE_MESSAGE_FRAGMENT}
    }
  }
`;

export const STARRED_PIC_MESSAGE_FRAGMENT = `
  ... on StarredPicMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    caption
  }
`;

export const STARRED_POLL_MESSAGE_FRAGMENT = `
  ... on StarredPollMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    poll {
      ${POLL_FRAGMENT}
    }
  }
`;

export const STARRED_AUDIO_MESSAGE_FRAGMENT = `
  ... on StarredAudioMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
  }
`;

export const STARRED_GROUP_CHAT_INVITE_MESSAGE_FRAGMENT = `
  ... on StarredGroupChatInviteMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
    inviteCode
  }
`;

export const STARRED_DOC_MESSAGE_FRAGMENT = `
  ... on StarredDocMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
  }
`;

export const STARRED_VIDEO_MESSAGE_FRAGMENT = `
  ... on StarredVideoMessage {
    __typename
    chatId
    messageId
    sender {
      ${ACCOUNT_FRAGMENT}
    }
    state
    sent
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    context {
      ${MESSAGE_CONTEXT_FRAGMENT}
    }
    isForwarded
  }
`;

export const STARRED_MESSAGE_FRAGMENT = `
  ${STARRED_TEXT_MESSAGE_FRAGMENT}
  ${STARRED_ACTION_MESSAGE_FRAGMENT}
  ${STARRED_PIC_MESSAGE_FRAGMENT}
  ${STARRED_POLL_MESSAGE_FRAGMENT}
  ${STARRED_AUDIO_MESSAGE_FRAGMENT}
  ${STARRED_GROUP_CHAT_INVITE_MESSAGE_FRAGMENT}
  ${STARRED_DOC_MESSAGE_FRAGMENT}
  ${STARRED_VIDEO_MESSAGE_FRAGMENT}
`;

export const DELETED_ACCOUNT_FRAGMENT = `
  ... on DeletedAccount {
    __typename
    id
  }
`;

export const ACCOUNTS_SUBSCRIPTION_FRAGMENT = `
  ${CREATED_SUBSCRIPTION_FRAGMENT}
  ${NEW_CONTACT_FRAGMENT}
  ${UPDATED_ACCOUNT_FRAGMENT}
  ${UPDATED_PROFILE_PIC_FRAGMENT}
  ${DELETED_CONTACT_FRAGMENT}
  ${BLOCKED_ACCOUNT_FRAGMENT}
  ${UNBLOCKED_ACCOUNT_FRAGMENT}
  ${DELETED_ACCOUNT_FRAGMENT}
`;

export const TYPING_USERS_FRAGMENT = `
  ... on TypingUsers {
    __typename
    chatId
    users {
      ${ACCOUNT_FRAGMENT}
    }
  }
`;

export const NONEXISTENT_USER_FRAGMENT = `
  ... on NonexistentUser {
    __typename
    placeholder
  }
`;

export const UNVERIFIED_EMAIL_ADDRESS_FRAGMENT = `
  ... on UnverifiedEmailAddress {
    __typename
    placeholder
  }
`;

export const EMAIL_ADDRESS_VERIFIED_FRAGMENT = `
  ... on EmailAddressVerified {
    __typename
    placeholder
  }
`;

export const USERNAME_TAKEN_FRAGMENT = `
  ... on UsernameTaken {
    __typename
    placeholder
  }
`;

export const INCORRECT_PASSWORD_FRAGMENT = `
  ... on IncorrectPassword {
    __typename
    placeholder
  }
`;

export const EMAIL_ADDRESS_TAKEN_FRAGMENT = `
  ... on EmailAddressTaken {
    __typename
    placeholder
  }
`;

export const INVALID_CHAT_ID_FRAGMENT = `
  ... on InvalidChatId {
    __typename
    placeholder
  }
`;

export const INVALID_ADMIN_ID_FRAGMENT = `
  ... on InvalidAdminId {
    __typename
    placeholder
  }
`;

export const UNREGISTERED_EMAIL_ADDRESS_FRAGMENT = `
  ... on UnregisteredEmailAddress {
    __typename
    placeholder
  }
`;

export const INVALID_USER_ID_FRAGMENT = `
  ... on InvalidUserId {
    __typename
    placeholder
  }
`;

export const INVALID_MESSAGE_ID_FRAGMENT = `
  ... on InvalidMessageId {
    __typename
    placeholder
  }
`;

export const CANNOT_DELETE_ACCOUNT_FRAGMENT = `
  ... on CannotDeleteAccount {
    __typename
    placeholder
  }
`;

export const INVALID_POLL_FRAGMENT = `
  ... on InvalidPoll {
    __typename
    placeholder
  }
`;

export const NONEXISTENT_OPTION_FRAGMENT = `
  ... on NonexistentOption {
    __typename
    placeholder
  }
`;

export const INVALID_INVITE_CODE_FRAGMENT = `
  ... on InvalidInviteCode {
    __typename
    placeholder
  }
`;

export const INVALID_INVITED_CHAT_FRAGMENT = `
  ... on InvalidInvitedChat {
    __typename
    placeholder
  }
`;

export const INVALID_DOMAIN_FRAGMENT = `
  ... on InvalidDomain {
    __typename
    placeholder
  }
`;

export const INVALID_ACTION_FRAGMENT = `
  ... on InvalidAction {
    __typename
    placeholder
  }
`;

export const MESSAGE_EDGES_FRAGMENT = `
  ... on MessageEdges {
    __typename
    edges {
      ${MESSAGE_EDGE_FRAGMENT}
    }
  }
`;

export const INVALID_VERIFICATION_CODE_FRAGMENT = `
  ... on InvalidVerificationCode {
    __typename
    placeholder
  }
`;

export const INVALID_PASSWORD_RESET_CODE_FRAGMENT = `
  ... on InvalidPasswordResetCode {
    __typename
    placeholder
  }
`;

export const CREATED_CHAT_ID_FRAGMENT = `
  ... on CreatedChatId {
    __typename
    id
  }
`;

export const SEARCH_CHAT_MESSAGES_RESULT_FRAGMENT = `
  ${MESSAGE_EDGES_FRAGMENT}
  ${INVALID_CHAT_ID_FRAGMENT}
`;

export const READ_CHAT_RESULT_FRAGMENT = `
  ${PRIVATE_CHAT_FRAGMENT}
  ${GROUP_CHAT_FRAGMENT}
  ${INVALID_CHAT_ID_FRAGMENT}
`;

export const READ_GROUP_CHAT_RESULT_FRAGMENT = `
  ${GROUP_CHAT_INFO_FRAGMENT}
  ${INVALID_INVITE_CODE_FRAGMENT}
`;

export const REQUEST_TOKEN_SET_RESULT_FRAGMENT = `
  ${TOKEN_SET_FRAGMENT}
  ${NONEXISTENT_USER_FRAGMENT}
  ${UNVERIFIED_EMAIL_ADDRESS_FRAGMENT}
  ${INCORRECT_PASSWORD_FRAGMENT}
`;

export const VERIFY_EMAIL_ADDRESS_RESULT_FRAGMENT = `
  ${INVALID_VERIFICATION_CODE_FRAGMENT}
  ${UNREGISTERED_EMAIL_ADDRESS_FRAGMENT}
`;

export const RESET_PASSWORD_RESULT_FRAGMENT = `
  ${INVALID_PASSWORD_RESET_CODE_FRAGMENT}
  ${UNREGISTERED_EMAIL_ADDRESS_FRAGMENT}
`;

export const UPDATED_ACCOUNT_RESULT_FRAGMENT = `
  ${USERNAME_TAKEN_FRAGMENT}
  ${EMAIL_ADDRESS_TAKEN_FRAGMENT}
`;

export const CREATE_ACCOUNT_RESULT_FRAGMENT = `
  ${USERNAME_TAKEN_FRAGMENT}
  ${EMAIL_ADDRESS_TAKEN_FRAGMENT}
  ${INVALID_DOMAIN_FRAGMENT}
`;

export const EMAIL_EMAIL_ADDRESS_VERIFICATION_RESULT_FRAGMENT = `
  ${UNREGISTERED_EMAIL_ADDRESS_FRAGMENT}
  ${EMAIL_ADDRESS_VERIFIED_FRAGMENT}
`;

export const CREATE_GROUP_CHAT_RESULT_FRAGMENT = `
  ${CREATED_CHAT_ID_FRAGMENT}
  ${INVALID_ADMIN_ID_FRAGMENT}
`;

export const CREATE_PRIVATE_CHAT_RESULT_FRAGMENT = `
  ${CREATED_CHAT_ID_FRAGMENT}
  ${INVALID_USER_ID_FRAGMENT}
`;

export const CREATE_TEXT_MESSAGE_RESULT_FRAGMENT = `
  ${INVALID_CHAT_ID_FRAGMENT}
  ${INVALID_MESSAGE_ID_FRAGMENT}
`;

export const CREATE_ACTION_MESSAGE_RESULT_FRAGMENT = `
  ${INVALID_CHAT_ID_FRAGMENT}
  ${INVALID_ACTION_FRAGMENT}
  ${INVALID_MESSAGE_ID_FRAGMENT}
`;

export const CREATE_GROUP_CHAT_INVITE_MESSAGE_RESULT_FRAGMENT = `
  ${INVALID_CHAT_ID_FRAGMENT}
  ${INVALID_INVITED_CHAT_FRAGMENT}
  ${INVALID_MESSAGE_ID_FRAGMENT}
`;

export const CREATE_POLL_MESSAGE_RESULT_FRAGMENT = `
  ${INVALID_CHAT_ID_FRAGMENT}
  ${INVALID_MESSAGE_ID_FRAGMENT}
  ${INVALID_POLL_FRAGMENT}
`;

export const FORWARD_MESSAGE_RESULT_FRAGMENT = `
  ${INVALID_CHAT_ID_FRAGMENT}
  ${INVALID_MESSAGE_ID_FRAGMENT}
`;

export const TRIGGER_ACTION_RESULT_FRAGMENT = `
  ${INVALID_MESSAGE_ID_FRAGMENT}
  ${INVALID_ACTION_FRAGMENT}
`;

export const SET_POLL_VOTE_RESULT_FRAGMENT = `
  ${INVALID_MESSAGE_ID_FRAGMENT}
  ${NONEXISTENT_OPTION_FRAGMENT}
`;

export const CANNOT_LEAVE_CHAT_FRAGMENT = `
  ... on CannotLeaveChat {
    __typename
    placeholder
  }
`;

export const UNSTARRED_CHAT_FRAGMENT = `
  ... on UnstarredChat {
    __typename
    id
  }
`;

export const LEAVE_GROUP_CHAT_RESULT_FRAGMENT = `
  ${INVALID_CHAT_ID_FRAGMENT}
  ${CANNOT_LEAVE_CHAT_FRAGMENT}
`;

export const READ_ONLINE_STATUS_RESULT_FRAGMENT = `
  ${ONLINE_STATUS_FRAGMENT}
  ${INVALID_USER_ID_FRAGMENT}
`;

export const UPDATED_MESSAGE_FRAGMENT = `
  ... on UpdatedMessage {
    __typename
    chatId
    messageId
    state
    statuses {
      ${MESSAGE_DATE_TIME_STATUS_FRAGMENT}
    }
    hasStar
  }
`;

export const MESSAGES_SUBSCRIPTION_FRAGMENT = `
  ${CREATED_SUBSCRIPTION_FRAGMENT}
  ${NEW_TEXT_MESSAGE_FRAGMENT}
  ${NEW_ACTION_MESSAGE_FRAGMENT}
  ${NEW_PIC_MESSAGE_FRAGMENT}
  ${NEW_AUDIO_MESSAGE_FRAGMENT}
  ${NEW_GROUP_CHAT_INVITE_MESSAGE_FRAGMENT}
  ${NEW_DOC_MESSAGE_FRAGMENT}
  ${NEW_VIDEO_MESSAGE_FRAGMENT}
  ${NEW_POLL_MESSAGE_FRAGMENT}
  ${TRIGGERED_ACTION_FRAGMENT}
  ${DELETED_MESSAGE_FRAGMENT}
  ${MESSAGE_DELETION_POINT_FRAGMENT}
  ${DELETION_OF_EVERY_MESSAGE_FRAGMENT}
  ${USER_CHAT_MESSAGES_REMOVAL_FRAGMENT}
  ${UPDATED_MESSAGE_FRAGMENT}
  ${UNSTARRED_CHAT_FRAGMENT}
`;

export const ONLINE_STATUSES_SUBSCRIPTION_FRAGMENT = `
  ${CREATED_SUBSCRIPTION_FRAGMENT}
  ${ONLINE_STATUS_FRAGMENT}
`;

export const STARRED_MESSAGES_CONNECTION_FRAGMENT = `
  ... on StarredMessagesConnection {
    __typename
    edges {
      ${STARRED_MESSAGE_FRAGMENT}
    pageInfo {
      ${PAGE_INFO_FRAGMENT}
    }
  }
`;

export const STARRED_MESSAGE_EDGE_FRAGMENT = `
  ... on StarredMessageEdge {
    __typename
    node {
      ${STARRED_MESSAGE_FRAGMENT}
    }
    cursor
  }
`;

export const CHAT_MESSAGES_EDGE_FRAGMENT = `
  ... on ChatMessageEdge {
    node {
      ${CHAT_MESSAGES_FRAGMENT}
    }
    cursor
  }
`;

export const CHAT_MESSAGES_CONNECTION_FRAGMENT = `
  ... on ChatMessagesConnection {
    __typename
    edges {
      ${CHAT_MESSAGES_EDGE_FRAGMENT}
    }
    pageInfo {
      ${PAGE_INFO_FRAGMENT}
    }
  }
`;

export const CHAT_EDGE_FRAGMENT = `
  ... on ChatEdge {
    __typename
    node {
      ${CHAT_FRAGMENT}
    }
    cursor
  }
`;

export const CHATS_CONNECTION_FRAGMENT = `
  ... on ChatsConnection {
    __typename
    edges {
      ${CHAT_EDGE_FRAGMENT}
    }
    pageInfo {
      ${PAGE_INFO_FRAGMENT}
    }
  }
`;

export const GROUP_CHAT_EDGE_FRAGMENT = `
  ... on GroupChatEdge {
    __typename
    node {
      ${GROUP_CHAT_FRAGMENT}
    }
    cursor
  }
`;

export const GROUP_CHATS_CONNECTION_FRAGMENT = `
  ... on GroupChatsConnection {
    __typename
    edges {
      ${GROUP_CHAT_EDGE_FRAGMENT}
    }
    pageInfo {
      ${PAGE_INFO_FRAGMENT}
    }
  }
`;
