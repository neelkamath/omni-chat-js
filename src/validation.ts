import {
  AccountInput,
  AccountUpdate,
  ActionMessageInput,
  GroupChatInput,
  Login,
  PollInput,
} from './graphql-api/models';

/** Invalid {@link DateTime}. */
export class DateTimeScalarError extends Error {}

/** Invalid {@link Username}. */
export class UsernameScalarError extends Error {}

/** Invalid {@link Name}. */
export class NameScalarError extends Error {}

/** Invalid {@link Bio}. */
export class BioScalarError extends Error {}

/** Invalid {@link Password}. */
export class PasswordScalarError extends Error {}

/** Invalid {@link GroupChatTitle}. */
export class GroupChatTitleScalarError extends Error {}

/** Invalid {@link GroupChatDescription}. */
export class GroupChatDescriptionScalarError extends Error {}

/** Invalid {@link Uuid}. */
export class UuidScalarError extends Error {}

/** Invalid {@link MessageText}. */
export class MessageTextScalarError extends Error {}

/**
 * @throws {@link UsernameScalarError} if the value is neither `null` nor a
 * valid {@link Username}.
 */
export function validateUsernameScalar(value: string | null): void {
  if (value === null) return;
  if (
    value.match(/\s/) !== null ||
    value.match(/[A-Z]/) !== null ||
    value.length < 1 ||
    value.length > 30
  )
    throw new UsernameScalarError();
}

/**
 * @throws {@link NameScalarError} if the value is neither `null` nor a valid
 * {@link Name}.
 */
export function validateNameScalar(value: string | null): void {
  if (value === null) return;
  if (value.match(/\s/) !== null || value.length > 30)
    throw new NameScalarError();
}

/**
 * @throws {@link BioScalarError} if the value is neither `null` nor a value
 * {@link Bio}.
 */
export function validateBioScalar(value: string | null): void {
  if (value !== null && value.length > 2500) throw new BioScalarError();
}

/**
 * @throws {@link GroupChatTitleScalarError} if the value is an invalid
 * {@link GroupChatTitle}.
 */
export function validateGroupChatTitleScalar(value: string): void {
  if (value.length < 1 || value.length > 70 || value.trim().length === 0)
    throw new GroupChatTitleScalarError();
}

/**
 * @throws {@link MessageTextScalarError} if the value is an invalid
 * {@link MessageText}.
 */
export function validateMessageTextScalar(value: string): void {
  if (value.length < 1 || value.length > 10_000 || value.trim().length === 0)
    throw new MessageTextScalarError();
}

/**
 * @throws {@link GroupChatDescriptionScalarError} if the value is an invalid
 * {@link GroupChatDescription}.
 */
export function validateGroupChatDescriptionScalar(value: string): void {
  if (value.length > 1000) throw new GroupChatDescriptionScalarError();
}

/**
 * @throws {@link DateTimeScalarError} if the value is an invalid
 * {@link DateTime}.
 */
export function validateDateTimeScalar(value: string): void {
  if (isNaN(Date.parse(value))) throw new DateTimeScalarError();
}

/**
 * @throws {@link PasswordScalarError} if the value is neither `null` nor a
 * valid {@link Password}.
 */
export function validatePasswordScalar(value: string | null): void {
  if (value !== null && value.match(/\s/) !== null)
    throw new PasswordScalarError();
}

/** @throws {@link UuidScalarError} if the value isn't a valid {@link Uuid}. */
export function validateUuidScalar(value: string): void {
  if (
    !value.match(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/ // eslint-disable-line max-len
    )
  )
    throw new UuidScalarError();
}

/**
 * @throws {@link UsernameScalarError}
 * @throws {@link PasswordScalarError}
 * @throws {@link NameScalarError}
 * @throws {@link BioScalarError}
 */
export function validateAccountInput({
  username,
  password,
  firstName,
  lastName,
  bio,
}: AccountInput): void {
  validateUsernameScalar(username);
  validatePasswordScalar(password);
  validateNameScalar(firstName);
  validateNameScalar(lastName);
  validateBioScalar(bio);
}

/**
 * @throws {@link UsernameScalarError}
 * @throws {@link PasswordScalarError}
 * @throws {@link NameScalarError}
 * @throws {@link BioScalarError}
 */
export function validateAccountUpdate({
  username,
  password,
  firstName,
  lastName,
  bio,
}: AccountUpdate): void {
  validateUsernameScalar(username);
  validatePasswordScalar(password);
  validateNameScalar(firstName);
  validateNameScalar(lastName);
  validateBioScalar(bio);
}

/**
 * @throws {@link UsernameScalarError}
 * @throws {@link PasswordScalarError}
 */
export function validateLogin({username, password}: Login): void {
  validateUsernameScalar(username);
  validatePasswordScalar(password);
}

/**
 * @throws {@link GroupChatTitleScalarError}
 * @throws {@link GroupChatDescriptionScalarError}
 */
export function validateGroupChatInput({
  title,
  description,
}: GroupChatInput): void {
  validateGroupChatTitleScalar(title);
  validateGroupChatDescriptionScalar(description);
}

/** @throws {@link MessageTextScalarError} */
export function validateActionMessageInput({
  text,
  actions,
}: ActionMessageInput): void {
  for (const message of [text, ...actions]) validateMessageTextScalar(message);
}

/** @throws {@link MessageTextScalarError} */
export function validatePollInput({title, options}: PollInput): void {
  for (const message of [title, ...options]) validateMessageTextScalar(message);
}
