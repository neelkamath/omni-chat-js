import { ACCOUNTS_CONNECTION_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { AccountsConnection } from '../models';
import { ForwardPagination } from '../pagination';
import { HttpApiConfig } from '../../config';

export interface SearchContactsData {
  readonly searchContacts: AccountsConnection;
}

/**
 * Case-insensitively searches contacts using their usernames, first names, last names, and email addresses.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function searchContacts(
  config: HttpApiConfig,
  accessToken: string,
  query: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<SearchContactsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query SearchContacts($query: String!, $first: Int, $after: Cursor) {
          searchContacts(query: $query, first: $first, after: $after) {
            ${ACCOUNTS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: {
        query,
        first: pagination?.first,
        after: pagination?.after,
      },
    },
    accessToken,
  );
}
