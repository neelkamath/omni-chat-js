import { CannotDeleteAccount } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CANNOT_DELETE_ACCOUNT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface DeleteAccountData {
  readonly deleteAccount: CannotDeleteAccount | null;
}

/**
 * Deletes the user's account. All the user's data will be wiped from the system. This means that users in private chats
 * with the user will have their chats deleted, etc.
 * @throws {@link InternalServerError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @returns `null` if the operation succeeded.
 */
export async function deleteAccount(
  config: HttpApiConfig,
  accessToken: string,
): Promise<GraphQlResponse<DeleteAccountData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeleteAccount {
          deleteAccount {
            ${CANNOT_DELETE_ACCOUNT_FRAGMENT}
          }
        }
      `,
    },
    accessToken,
  );
}
