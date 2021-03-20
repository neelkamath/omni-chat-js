# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.7.0) - 2020-03-20

### Added

- Support React Native.
- `type MessageState`
- `interface TypingUsers`
- `interface NonexistentUser`
- `interface UnverifiedEmailAddress`
- `interface EmailAddressVerified`
- `interface UsernameTaken`
- `interface IncorrectPassword`
- `interface EmailAddressTaken`
- `interface InvalidChatId`
- `interface InvalidAdminId`
- `interface UnregisteredEmailAddress`
- `interface InvalidUserId`
- `interface InvalidMessageId`
- `interface CannotDeleteAccount`
- `interface InvalidPoll`
- `interface NonexistentOption`
- `interface InvalidInviteCode`
- `interface InvalidInvitedChat`
- `interface InvalidDomain`
- `interface InvalidAction`
- `interface MessageEdges`
- `interface InvalidVerificationCode`
- `interface InvalidPasswordResetCode`
- `interface CreatedChatId`
- `type SearchChatMessagesResult`
- `type ReadChatResult`
- `type ReadGroupChatResult`
- `type RequestTokenSetResult`
- `type VerifyEmailAddressResult`
- `type ResetPasswordResult`
- `type UpdateAccountResult`
- `type CreateAccountResult`
- `type EmailEmailAddressVerificationResult`
- `type CreateGroupChatResult`
- `type CreatePrivateChatResult`
- `type CreateTextMessageResult`
- `type CreateActionMessageResult`
- `type CreateGroupChatInviteMessageResult`
- `type CreatePollMessageResult`
- `type ForwardMessageResult`
- `type TriggerActionResult`
- `type SetPollVoteResult`
- `interface CannotLeaveChat`
- `interface UnstarredChat`
- `type LeaveGroupChatResult`
- `type ReadOnlineStatusResult`
- `interface UpdatedMessage`
- `QueriesApi.readOnlineStatus()`
- `MutationsApi.joinPublicChat()`
- `MutationsApi.leaveGroupChat()`
- `interface GraphQlResponseValue`

### Changed

- Rename `MutationsApi.deleteStar()` to `MutationsApi.unstar()`.
- Add the field `readonly state: MessageState` to the following:
  - `interface BareMessage`
  - `interface Message`
  - `interface TextMessage`
  - `interface ActionMessage`
  - `interface PicMessage`
  - `interface PollMessage`
  - `interface AudioMessage`
  - `interface GroupChatInviteMessage`
  - `interface DocMessage`
  - `interface VideoMessage`
  - `interface BareChatMessage`
  - `interface StarredMessage`
  - `interface StarredTextMessage`
  - `interface StarredActionMessage`
  - `interface StarredPicMessage`
  - `interface StarredPollMessage`
  - `interface StarredAudioMessage`
  - `interface StarredGroupChatInviteMessage`
  - `interface StarredDocMessage`
  - `interface StarredVideoMessage`
  - `interface NewMessage`
  - `interface NewTextMessage`
  - `interface NewActionMessage`
  - `interface NewPicMessage`
  - `interface NewPollMessage`
  - `interface NewAudioMessage`
  - `interface NewGroupChatInviteMessage`
  - `interface NewDocMessage`
  - `interface NewVideoMessage`
- GraphQL operations used to return results related to invalid input in the GraphQL document's `errors[0].message`. Such results are supposed to be returned in the GraphQL document's `data` value instead. Change the following operations' return types accordingly:
  - `QueriesApi.searchChatMessages()`
  - `QueriesApi.readChat()`
  - `QueriesApi.readGroupChat()`
  - `QueriesApi.requestTokenSet()`
  - `MutationsApi.blockUser()`
  - `MutationsApi.deleteAccount()`
  - `MutationsApi.verifyEmailAddress()`
  - `MutationsApi.resetPassword()`
  - `MutationsApi.star()`
  - `MutationsApi.setTyping()`
  - `MutationsApi.createStatus()`
  - `MutationsApi.updateAccount()`
  - `MutationsApi.createAccount()`
  - `MutationsApi.emailEmailAddressVerification()`
  - `MutationsApi.emailPasswordResetCode()`
  - `MutationsApi.removeGroupChatUsers()`
  - `MutationsApi.createGroupChat()`
  - `MutationsApi.setInvitability()`
  - `MutationsApi.joinGroupChat()`
  - `MutationsApi.deletePrivateChat()`
  - `MutationsApi.createPrivateChat()`
  - `MutationsApi.createTextMessage()`
  - `MutationsApi.createActionMessage()`
  - `MutationsApi.createGroupChatInviteMessage()`
  - `MutationsApi.createPollMessage()`
  - `MutationsApi.forwardMessage()`
  - `MutationsApi.triggerAction()`
  - `MutationsApi.setPollVote()`
  - `MutationsApi.deleteMessage()`
- Disallow leading and trailing whitespace in the following:
  - `type Bio`
  - `type GroupChatTitle`
  - `type GroupChatDescription`
  - `type MessageText`
- Add the following to `type MessagesSubscription`:
  - `interface UnstarredChat`
  - `interface UpdatedMessage`
- Remove the following from `type MessagesSubscription`:
  - `interface UpdatedTextMessage`
  - `interface UpdatedActionMessage`
  - `interface UpdatedPicMessage`
  - `interface UpdatedAudioMessage`
  - `interface UpdatedGroupChatInviteMessage`
  - `interface UpdatedDocMessage`
  - `interface UpdatedVideoMessage`
  - `interface UpdatedPollMessage`
  - `interface UnstarredChat`
- Replace `interface ExitedUser` with `interface ExitedUsers`.
- Replace `interface UpdatedOnlineStatus` with `interface OnlineStatus` in `type OnlineStatusesSubscription`.
- Replace `QueriesApi.readTypingStatuses()` with `QueriesApi.readTypingUsers()`.
- Change `type Placeholder = string` to `type Placeholder = ''`.
- `interface GraphQlResponse`
- Throw only `class UnauthorizedError`, `class InternalServerError`, and `class ConnectionError` from `queryOrMutate()`.

### Fixed

- `MutationsApi.deleteAccount()`
- Unstar any messages the user starred in the chat they've left when calling `MutationsApi.deletePrivateChat()`, `MutationsApi.leaveGroupChat()`, or `MutationsApi.removeGroupChatUsers()`.

### Removed

- Remove `interface GraphQlData` and `interface GraphQlError` in favor of `interface GraphQlResponseValue`.
- Remove `interface UpdatedOnlineStatus` in favor of `interface OnlineStatus`.
- Remove `QueriesApi.readOnlineStatuses()` in favor of `QueriesApi.readOnlineStatus()`.
- Remove the following in favor of `interface UpdatedMessage`:
  - `interface UpdatedMessage`
  - `interface UpdatedTextMessage`
  - `interface UpdatedAudioMessage`
  - `interface UpdatedPicMessage`
  - `interface UpdatedPollMessage`
  - `interface UpdatedVideoMessage`
  - `interface UpdatedActionMessage`
  - `interface UpdatedDocMessage`
  - `interface UpdatedGroupChatInviteMessage`
- `class InvalidUserIdError`
- `class InvalidMessageIdError`
- `class InvalidChatIdError`
- `class InvalidAdminIdError`
- `class NonexistentOptionError`
- `class InvalidInvitedChatError`
- `class InvalidInviteCodeError`
- `class InvalidPollError`
- `class CannotDeleteAccountError`
- `class InvalidActionError`
- `class InvalidDomainError`
- `class UnregisteredEmailAddressError`
- `class UsernameTakenError`
- `class EmailAddressTakenError`
- `class EmailAddressVerifiedError`
- `class NonexistentUserError`
- `class UnverifiedEmailAddressError`
- `class IncorrectPasswordError`

## [0.7.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.7.0) - 2020-03-14

### Added

- Support Node.js.
- Support CommonJS modules.

## [0.6.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.6.0) - 2020-03-13

### Added

- Add `GraphQlRequest`, `GraphQlResponse`, `GraphQlData`, `GraphQlError`, `queryOrMutate()`, and `subscribe()`.

### Fixed

- Fix GraphQL queries which contain `ActionMessage`.
- Fix `MutationsApi.setPollVote()`.

## [0.5.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.5.0) - 2020-03-11

### Added

- `QueriesApi.readTypingStatuses()`
- `UpdatedProfilePic`
- `UpdatedGroupChatPic`

### Changed

- Send back an `ExitedUser` over `SubscriptionsApi.subscribeToGroupChats()` if the user themselves left the chat.
- `UpdatedAccount`
- `UpdatedGroupChat`
- `UpdatedOnlineStatus`
- `UpdatedMessage`
- `UpdatedTextMessage`
- `UpdatedActionMessage`
- `UpdatedPicMessage`
- `UpdatedPollMessage`
- `UpdatedAudioMessage`
- `UpdatedGroupChatInviteMessage`
- `UpdatedDocMessage`
- `UpdatedVideoMessage`
- `TextMessage`
- `ActionMessage`
- `NewTextMessage`
- `NewActionMessage`
- `StarredTextMessage`
- `StarredActionMessage`
- Return messages from `QueriesApi.searchChatMessages()` in chronological order.
- Return messages from `QueriesApi.searchMessages()` in chronological order.

### Removed

- `QueriesApi.isBlocked()`
- `QueriesApi.isContact()`

### Fixed

- Fix `SubscriptionsApi.subscribeToGroupChats()`.
- Fix `QueriesApi.readStars`.
- Re-export `OnSocketClose`, `OnSocketMessage`, `OnSocketError`, `UuidScalarError`, `PasswordScalarError`, `BioScalarError`, `MessageTextScalarError`, `GroupChatDescriptionScalarError`, `GroupChatTitleScalarError`, `UsernameScalarError`, `NameScalarError`, and `DateTimeScalarError` correctly.
- Fix an issue where some notifications weren't sent back to clients over WebSockets.
- Fix `NewActionMessage`, etc. not being supported in `SubscriptionsApi`.
- Fix `QueriesApi.searchChatMessages()`.
- Fix `QueriesApi.searchMessages()`.

## [0.4.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.4.0) - 2020-02-27

### Fixed

- Fix `SubscriptionsApi.subscribeToMessages()`.
- Fix `SubscriptionsApi.subscribeToGroupChats()`.

## [0.3.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.3.0) - 2020-02-20

### Fixed

- Fix `QueriesApi.readContacts()`.

## [0.2.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.2.0) - 2020-02-20

### Fixed

- Fix `QueriesApi.readContacts()`.

## [0.1.0](https://github.com/neelkamath/omni-chat-js/releases/tag/v0.1.0) - 2020-02-12

### Added

- First version.
