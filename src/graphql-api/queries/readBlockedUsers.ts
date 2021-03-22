import { AccountsConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { ForwardPagination } from '../pagination';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { ACCOUNTS_CONNECTION_FRAGMENT } from '../fragments';

export interface ReadBlockedUsersData {
  readonly readBlockedUsers: AccountsConnection;
}

/**
 * @returns users blocked by this user.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function readBlockedUsers(
  config: HttpApiConfig,
  accessToken: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<ReadBlockedUsersData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query ReadBlockedUsers($first: Int, $after: Cursor) {
          readBlockedUsers(first: $first, after: $after) {
            ${ACCOUNTS_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: { first: pagination?.first, after: pagination?.after },
    },
    accessToken,
  );
}
