/**
 * Official [Omni Chat API](https://github.com/neelkamath/omni-chat-backend) JavaScript wrapper library.
 *
 * The Omni Chat API consists of a REST API, and a GraphQL API.
 *
 * The REST API is used for tasks not well suited for GraphQL such as image uploads. Use the wrapper functions which
 * have the same name as the operation name in Omni Chat Backend's REST API docs (e.g., {@link getProfilePic}) to
 * interact with the REST API.
 *
 * In order to avoid the
 * [under-fetching and over-fetching](https://stackoverflow.com/questions/44564905/what-is-over-fetching-or-under-fetching#44568365)
 * problems posed by REST APIs, the GraphQL API is the primary interface. There are two methods of interacting with the
 * GraphQL API:
 * - The easier method is to use the individually wrapped operations. The wrapper functions are named the same as the
 * GraphQL operations (e.g., {@link readChats}). These functions handle building the GraphQL query for you, and return
 * the data in a predictable matter which provides for better autocomplete and compile-time safety. Since this method
 * constructs the GraphQL query to retrieve every possible field, the over-fetching problem may come into play. This may
 * not be an issue since the data retrieved is still paginated to keep over-fetching to a practical minimum.
 * - The other method of interacting with the GraphQL API is to use the {@link queryOrMutate} and {@link subscribe}
 * functions to handle queries and mutations, and subscriptions respectively. These functions allow you to pass your own
 * GraphQL queries so that you can only select the fields you need to retrieve.
 *
 * Use the `isValid*Scalar()` (e.g., {@link isValidUsernameScalar}) functions to validate GraphQL scalars.
 * @packageDocumentation
 */

export * from './graphql-api';
export * from './rest-api';
export * from './config';
export * from './errors';
