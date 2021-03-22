import { ACCOUNTS_CONNECTION_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { AccountsConnection } from '../models';
import { ForwardPagination } from '../pagination';
import { HttpApiConfig } from '../../config';

export interface SearchUsersData {
  readonly searchUsers: AccountsConnection;
}

/**
 * @param query - Case-insensitively matched against users' usernames, email addresses, first names, and last names.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function searchUsers(
  config: HttpApiConfig,
  query: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<SearchUsersData>> {
  return await queryOrMutate(config, {
    query: `
      query SearchUsers($query: String!, $first: Int, $after: Cursor) {
        searchUsers(query: $query, first: $first, after: $after) {
          ${ACCOUNTS_CONNECTION_FRAGMENT}
        }
      }
    `,
    variables: {
      query,
      first: pagination?.first,
      after: pagination?.after,
    },
  });
}
