/**
 * The main `export`s are {@link QueriesApi}, {@link MutationsApi}, {@link SubscriptionsApi}, and {@link RestApi}. The
 * rest are custom data types such as errors, `type`s, and `interface`s.
 * @packageDocumentation
 */

export * from './graphql-api/errors';
export * from './graphql-api/models';
export { MutationsApi } from './graphql-api/MutationsApi';
export * from './graphql-api/pagination';
export { QueriesApi } from './graphql-api/QueriesApi';
export { SubscriptionsApi } from './graphql-api/SubscriptionsApi';
export * from './rest-api/errors';
export * from './rest-api/models';
export { RestApi } from './rest-api/RestApi';
export * from './errors';
export * from './config';
export { OnSocketClose, OnSocketMessage, OnSocketError } from './graphql-api/operator';
export {
  UuidScalarError,
  PasswordScalarError,
  BioScalarError,
  MessageTextScalarError,
  GroupChatDescriptionScalarError,
  GroupChatTitleScalarError,
  UsernameScalarError,
  NameScalarError,
  DateTimeScalarError,
} from './validation';
