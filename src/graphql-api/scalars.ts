export type Uuid = string;

/**
 * GraphQL mandates data be returned for every operation, and data be present in every type. However, certain operations
 * and types don't have relevant data. This type, which is an empty string, indicates such.
 */
export type Placeholder = '';

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

/** @returns Whether the value is a valid {@link Username}. */
export function isValidUsernameScalar(value: string): boolean {
  return value.length > 0 && value.length < 31 && value.match(/[^a-z0-9_.]/) === null;
}

/** @returns Whether the value is a valid {@link Name}. */
export function isValidNameScalar(value: string): boolean {
  return value.match(/\s/) === null && value.length < 31;
}

/** @returns Whether the value is a valid {@link Bio}. */
export function isValidBioScalar(value: string): boolean {
  return value.trim() === value && value.length < 2501;
}

/** @returns Whether the value is a valid {@link GroupChatTitle}. */
export function isValidGroupChatTitleScalar(value: string): boolean {
  return value.length > 0 && value.length < 71 && value.trim() === value;
}

/** @returns Whether the value is a valid {@link MessageText}. */
export function isValidMessageTextScalar(value: string): boolean {
  return value.length > 0 && value.length < 10_001 && value.trim() === value;
}

/** @returns Whether the value is a valid {@link GroupChatDescription}. */
export function isValidGroupChatDescriptionScalar(value: string): boolean {
  return value.length < 1001 && value.trim() === value;
}

/** @returns Returns whether the value is a valid {@link DateTime}. */
export function isValidDateTimeScalar(value: string): boolean {
  return !isNaN(Date.parse(value));
}

/** @returns Whether the value is a valid {@link Password}. */
export function isValidPasswordScalar(value: string): boolean {
  return value.trim().length > 0;
}

/** @returns Whether the value is a valid {@link Uuid}. */
export function isValidUuidScalar(value: string): boolean {
  return value.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/) !== null;
}
