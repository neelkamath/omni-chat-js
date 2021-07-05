/**
 * - `'NOT_INVITABLE'`: Users cannot join the chat via an invite code.
 * - `'INVITABLE'`: Users can join the chat via an invite code.
 * - `'PUBLIC'`: People can search for, and view public chats without an account. Invite codes are permanently turned on.
 * Anyone with an account can join a public chat. A frontend UI may allow for a search engine to index the chat should
 * the administrator allow for it. A chat must be made public when it's being created because chats can't switch between
 * being public after they've been created.
 */
export type GroupChatPublicity = 'NOT_INVITABLE' | 'INVITABLE' | 'PUBLIC';
