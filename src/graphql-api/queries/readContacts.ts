import { AccountsConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { ForwardPagination } from '../pagination';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { ACCOUNTS_CONNECTION_FRAGMENT } from '../fragments';

export interface ReadContactsData {
  readonly readContacts: AccountsConnection;
}

/**
 * @returns Saved contacts.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function readContacts(
  config: HttpApiConfig,
  accessToken: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<ReadContactsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query ReadContacts($first: Int, $after: Cursor) {
          readContacts(first: $first, after: $after) {
            ${ACCOUNTS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: { first: pagination?.first, after: pagination?.after },
    },
    accessToken,
  );
}
