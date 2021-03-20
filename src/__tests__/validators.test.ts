import {
  BioScalarError,
  DateTimeScalarError,
  GroupChatDescriptionScalarError,
  GroupChatTitleScalarError,
  MessageTextScalarError,
  NameScalarError,
  PasswordScalarError,
  UsernameScalarError,
  UuidScalarError,
  validateBioScalar,
  validateDateTimeScalar,
  validateGroupChatDescriptionScalar,
  validateGroupChatTitleScalar,
  validateMessageTextScalar,
  validateNameScalar,
  validatePasswordScalar,
  validateUsernameScalar,
  validateUuidScalar,
} from '../validation';

describe('validateUsernameScalar()', () => {
  test('username must be valid', () => expect(() => validateUsernameScalar('username')).not.toThrowError());

  test('username cannot contain whitespace', () =>
    expect(() => validateUsernameScalar('user name')).toThrowError(UsernameScalarError));

  test('username must be lowercase', () =>
    expect(() => validateUsernameScalar('Username')).toThrowError(UsernameScalarError));

  test('username must contain at least one character', () =>
    expect(() => validateUsernameScalar('')).toThrowError(UsernameScalarError));

  test('username must be at most 30 characters', () => {
    const value = Array(31)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(() => validateUsernameScalar(value)).toThrowError(UsernameScalarError);
  });
});

describe('validateNameScalar()', () => {
  test('name must be valid', () => expect(() => validateNameScalar('Name')).not.toThrowError());

  test('name must not contain whitespace', () =>
    expect(() => validateNameScalar('Middle Name')).toThrowError(NameScalarError));

  test('name must be at most 30 characters', () => {
    const value = Array(31)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(() => validateNameScalar(value)).toThrowError(NameScalarError);
  });
});

describe('validateBioScalar()', () => {
  test('bio must be valid', () => expect(() => validateBioScalar('Bio')).not.toThrowError());

  test('bio must be at most 2,500 characters', () => {
    const value = Array(2501)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(() => validateBioScalar(value)).toThrowError(BioScalarError);
  });

  test('bio must disallow leading and trailing whitespace', () =>
    expect(() => validateBioScalar(' Bio ')).toThrowError(BioScalarError));
});

describe('validateGroupChatTitleScalar()', () => {
  test('title must be valid', () => expect(() => validateGroupChatTitleScalar('Title')).not.toThrowError());

  test('title must be at least one character', () =>
    expect(() => validateGroupChatTitleScalar('')).toThrowError(GroupChatTitleScalarError));

  test('title must disallow leading and trailing whitespace', () =>
    expect(() => validateGroupChatTitleScalar(' Title ')).toThrowError(GroupChatTitleScalarError));

  test('title must be at most 70 characters', () => {
    const value = Array(71)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(() => validateGroupChatTitleScalar(value)).toThrowError(GroupChatTitleScalarError);
  });
});

describe('validateMessageTextScalar()', () => {
  test('text must be valid', () => expect(() => validateMessageTextScalar('text')).not.toThrowError());

  test('text must be at least one character', () =>
    expect(() => validateMessageTextScalar('')).toThrowError(MessageTextScalarError));

  test('text must be at most 10,000 characters', () => {
    const value = Array(10_001)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(() => validateMessageTextScalar(value)).toThrowError(MessageTextScalarError);
  });

  test('text must disallow leading and trailing whitespace', () =>
    expect(() => validateMessageTextScalar(' text ')).toThrowError(MessageTextScalarError));
});

describe('validateGroupChatDescriptionScalar()', () => {
  test('description must be valid', () =>
    expect(() => validateGroupChatDescriptionScalar('description')).not.toThrowError());

  test('description must be at most 1,000 characters', () => {
    const value = Array(1001)
      .fill('a')
      .reduce((prev, curr) => prev + curr, '');
    expect(() => validateGroupChatDescriptionScalar(value)).toThrowError(GroupChatDescriptionScalarError);
  });

  test('description must disallow leading and trailing whitespace', () =>
    expect(() => validateGroupChatDescriptionScalar(' description ')).toThrowError(GroupChatDescriptionScalarError));
});

describe('validateDateTimeScalar()', () => {
  test('date and time must be valid', () =>
    expect(() => validateDateTimeScalar('2021-01-19T11:18:19.402Z')).not.toThrowError());

  test('date and time must not be valid', () =>
    expect(() => validateDateTimeScalar('2021-01-19T11:18:19.:')).toThrowError(DateTimeScalarError));
});

describe('validatePasswordScalar()', () => {
  test('password must be valid', () => expect(() => validatePasswordScalar('password')).not.toThrowError());

  test('password must contain non-whitespace characters', () =>
    expect(() => validatePasswordScalar(' ')).toThrowError(PasswordScalarError));
});

describe('validateUuidScalar()', () => {
  test('the scalar must be valid', () =>
    expect(() => validateUuidScalar('123e4567-e89b-12d3-a456-426614174000')).not.toThrowError());

  test('the scalar must not be valid', () =>
    expect(() => validateUuidScalar('123e4567-e89b-12d3-a456-42661417400')).toThrowError(UuidScalarError));
});
