/** Pic wasn't a PNG or JPEG not exceeding 3 MiB. */
export class InvalidPicError extends Error {}

/** Audio wasn't an MP3/MP4 not exceeding 3 MiB. */
export class InvalidAudioError extends Error {}

/** Video wasn't an MP4 not exceeding 3 MiB. */
export class InvalidVideoError extends Error {}

/** Doc exceeded 3 MiB. */
export class InvalidDocError extends Error {}

export class NonexistentUserIdError extends Error {}

export class NonexistentChatError extends Error {}

export class UserNotInChatError extends Error {}

export class InvalidContextMessageError extends Error {}

export class MessageTextScalarError extends Error {}

/** The user attempted to create a message in a broadcast chat but was disallowed because they're not an admin. */
export class MustBeAdminError extends Error {}
