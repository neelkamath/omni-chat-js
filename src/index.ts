/**
 * This is the official ES6 (e.g., JavaScript, TypeScript) library for browsers which wraps the
 * [Omni Chat API](https://github.com/neelkamath/omni-chat-backend).
 *
 * The Omni Chat API consists of one GraphQL API, and one REST API.
 *
 * The REST API is used for tasks not well suited for GraphQL such as image uploads. Use the {@link RestApi} class to
 * interact with it.
 *
 * In order to avoid the
 * [under-fetching and over-fetching](https://stackoverflow.com/questions/44564905/what-is-over-fetching-or-under-fetching#44568365)
 * problems posed problems posed by REST APIs, the GraphQL API is the primary interface. There are two methods of
 * interacting with the GraphQL API:
 * - The easier method is to use the {@link QueriesApi}, {@link MutationsApi}, and {@link SubscriptionsApi} classes.
 * These classes handle input validation (e.g., {@link MutationsApi.createAccount} may throw a
 * {@link UsernameScalarError}), building the GraphQL query, handling errors, and returning the data. Since this method
 * only allows you to perform one operation per request, and the GraphQL query is constructed to retrieve every possible
 * field, the under-fetching and over-fetching problems may come into play. This might not be a problem since you may
 * only execute a single GraphQL operation at a time even otherwise, and the data retrieved is still paginated so that
 * over-fetching is kept to a practical minimum.
 * - The other method of interacting with the GraphQL API is to use the {@link queryOrMutate} and {@link subscribe}
 * functions. These functions allow you to pass your own GraphQL queries so that you can execute multiple operations at
 * a time, and only select the fields you need to retrieve.
 *
 * @packageDocumentation
 */

export * from './graphql-api/errors';
export * from './graphql-api/models';
export * from './graphql-api/MutationsApi';
export * from './graphql-api/operator';
export * from './graphql-api/pagination';
export * from './graphql-api/QueriesApi';
export * from './graphql-api/SubscriptionsApi';
export * from './rest-api/errors';
export * from './rest-api/models';
export * from './rest-api/RestApi';
export * from './config';
export * from './errors';
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
