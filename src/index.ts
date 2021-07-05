/**
 * [Omni Chat API](https://github.com/neelkamath/omni-chat-backend) JavaScript wrapper library.
 *
 * The Omni Chat API consists of a REST API, and a GraphQL API.
 *
 * The REST API is used for tasks not well suited for GraphQL such as image uploads. Use the wrapper functions which
 * have the same name as the operation name in Omni Chat Backend's REST API docs (e.g., {@link getProfilePic}) to
 * interact with the REST API.
 *
 * In order to avoid the
 * [under-fetching and over-fetching](https://stackoverflow.com/questions/44564905/what-is-over-fetching-or-under-fetching#44568365)
 * problems posed by REST APIs, the GraphQL API is the primary interface. Use the {@link queryOrMutate} and
 * {@link subscribe} functions to handle queries and mutations, and subscriptions respectively.
 *
 * Use the `isValid*Scalar()` (e.g., {@link isValidUsernameScalar}) functions to validate GraphQL scalars.
 * @packageDocumentation
 */

export * from './graphql-api';
export * from './rest-api';
export * from './config';
export * from './errors';
