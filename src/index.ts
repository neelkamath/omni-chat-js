/**
 * Official [Omni Chat API](https://github.com/neelkamath/omni-chat-backend) JavaScript wrapper library.
 *
 * The Omni Chat API consists of a REST and GraphQL API.
 *
 * The REST API is used for tasks not well suited for GraphQL such as image uploads. Use the REST API operations such as
 * {@link getProfilePic} to interact with it.
 *
 * In order to avoid the
 * [under-fetching and over-fetching](https://stackoverflow.com/questions/44564905/what-is-over-fetching-or-under-fetching#44568365)
 * problems posed by REST APIs, the GraphQL API is the primary interface. There are two methods of interacting with the
 * GraphQL API:
 * - The easier method is to use the individually wrapped operations such as {@link readChats}. These functions handle
 * building the GraphQL query for you. Since this method constructs the GraphQL query to retrieve every possible field,
 * the over-fetching problem may come into play. This may not be an issue since the data retrieved is still paginated to
 * keep over-fetching to a practical minimum.
 * - The other method of interacting with the GraphQL API is to use the {@link queryOrMutate} and {@link subscribe}
 * functions. These functions allow you to pass your own GraphQL queries so that you can only select the fields you need
 * to retrieve.
 *
 * Use the `isValid*Scalar` (e.g., {@link isValidUsernameScalar}) functions to validate inputs.
 * @packageDocumentation
 */

export * from './graphql-api/index';
export * from './rest-api/index';
export * from './config';
export * from './errors';
