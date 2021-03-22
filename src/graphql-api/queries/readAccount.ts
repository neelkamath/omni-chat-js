import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { ACCOUNT_FRAGMENT } from '../fragments';

export interface ReadAccountData {
  readonly readAccount: Account;
}

/**
 * @return The user's account info.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function readAccount(
  config: HttpApiConfig,
  accessToken: string,
): Promise<GraphQlResponse<ReadAccountData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query ReadAccount {
          readAccount {
             ${ACCOUNT_FRAGMENT}
          }
        }
      `,
    },
    accessToken,
  );
}
