# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
