import {
  isValidBioScalar,
  isValidDateTimeScalar,
  isValidGroupChatDescriptionScalar,
  isValidGroupChatTitleScalar,
  isValidMessageTextScalar,
  isValidNameScalar,
  isValidPasswordScalar,
  isValidUsernameScalar,
  isValidUuidScalar,
} from '../graphql-api';

describe('isValidUsernameScalar()', () => {
  test('username must be valid', () => expect(isValidUsernameScalar('a0._')).toBe(true));

  test('username cannot contain whitespace', () => expect(isValidUsernameScalar('user name')).toBe(false));

  test('username must be lowercase', () => expect(isValidUsernameScalar('Username')).toBe(false));

  test('username must contain at least one character', () => expect(isValidUsernameScalar('')).toBe(false));

  test('username must be at most 30 characters', () => {
    const value = Array(31)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(isValidUsernameScalar(value)).toBe(false);
  });
});

describe('isValidNameScalar()', () => {
  test('name must be valid', () => expect(isValidNameScalar('Name')).toBe(true));

  test('name must not contain whitespace', () => expect(isValidNameScalar('Middle Name')).toBe(false));

  test('name must be at most 30 characters', () => {
    const value = Array(31)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(isValidNameScalar(value)).toBe(false);
  });
});

describe('isValidBioScalar()', () => {
  test('bio must be valid', () => expect(isValidBioScalar('Bio')).toBe(true));

  test('bio must be at most 2,500 characters', () => {
    const value = Array(2501)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(isValidBioScalar(value)).toBe(false);
  });

  test('bio must disallow leading and trailing whitespace', () => expect(isValidBioScalar(' Bio ')).toBe(false));
});

describe('isValidGroupChatTitleScalar()', () => {
  test('title must be valid', () => expect(isValidGroupChatTitleScalar('Title')).toBe(true));

  test('title must be at least one character', () => expect(isValidGroupChatTitleScalar('')).toBe(false));

  test('title must disallow leading and trailing whitespace', () =>
    expect(isValidGroupChatTitleScalar(' Title ')).toBe(false));

  test('title must be at most 70 characters', () => {
    const value = Array(71)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(isValidGroupChatTitleScalar(value)).toBe(false);
  });
});

describe('isValidMessageTextScalar()', () => {
  test('text must be valid', () => expect(isValidMessageTextScalar('text')).toBe(true));

  test('text must be at least one character', () => expect(isValidMessageTextScalar('')).toBe(false));

  test('text must be at most 10,000 characters', () => {
    const value = Array(10_001)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(isValidMessageTextScalar(value)).toBe(false);
  });

  test('text must disallow leading and trailing whitespace', () =>
    expect(isValidMessageTextScalar(' text ')).toBe(false));
});

describe('isValidGroupChatDescriptionScalar()', () => {
  test('description must be valid', () => expect(isValidGroupChatDescriptionScalar('description')).toBe(true));

  test('description must be at most 1,000 characters', () => {
    const value = Array(1001)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(isValidGroupChatDescriptionScalar(value)).toBe(false);
  });

  test('description must disallow leading and trailing whitespace', () =>
    expect(isValidGroupChatDescriptionScalar(' description ')).toBe(false));
});

describe('isValidDateTimeScalar()', () => {
  test('date and time must be valid', () => expect(isValidDateTimeScalar('2021-01-19T11:18:19.402Z')).toBe(true));

  test('date and time must not be valid', () => expect(isValidDateTimeScalar('2021-01-19T11:18:19.:')).toBe(false));
});

describe('isValidPasswordScalar()', () => {
  test('password must be valid', () => expect(isValidPasswordScalar('password')).toBe(true));

  test('password must contain non-whitespace characters', () => expect(isValidPasswordScalar(' ')).toBe(false));
});

describe('isValidUuidScalar()', () => {
  test('the scalar must be valid', () => expect(isValidUuidScalar('123e4567-e89b-12d3-a456-426614174000')).toBe(true));

  test('the scalar must not be valid', () =>
    expect(isValidUuidScalar('123e4567-e89b-12d3-a456-42661417400')).toBe(false));

  test('a nested UUID must be invalid', () =>
    expect(isValidUuidScalar('UUID: 123e4567-e89b-12d3-a456-426614174000')).toBe(false));
});
