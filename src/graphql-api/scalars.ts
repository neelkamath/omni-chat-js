/** @returns Whether the value is a valid {@link Username}. */
export function isValidUsernameScalar(value: string): boolean {
  return value.match(/\s/) === null && value.match(/[A-Z]/) === null && value.length > 0 && value.length < 31;
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
