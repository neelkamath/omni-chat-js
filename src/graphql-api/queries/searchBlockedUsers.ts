import { AccountsConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { ACCOUNTS_CONNECTION_FRAGMENT } from '../fragments';
import { ForwardPagination } from '../pagination';

export interface SearchBlockedUsers {
  readonly searchBlockedUsers: AccountsConnection;
}

/**
 * Searches blocked users. The `query` is case-insensitively matched against users' usernames, email addresses, first
 * names, and last names.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 * @throws {@link UnauthorizedError}
 */
export async function searchBlockedUsers(
  config: HttpApiConfig,
  accessToken: string,
  query: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<SearchBlockedUsers>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query SearchBlockedUsers($query: String!, $first: Int, $after: Cursor) {
          searchBlockedUsers(query: $query, first: $first, after: $after) {
            ${ACCOUNTS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: { query, first: pagination?.first, after: pagination?.after },
    },
    accessToken,
  );
}
