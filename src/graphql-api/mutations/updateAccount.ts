import { AccountUpdate, UpdateAccountResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { UPDATED_ACCOUNT_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface UpdateAccountData {
  readonly updateAccount: UpdateAccountResult | null;
}

/**
 * Updates the user's account. Only the non-`null` fields will be updated. None of the updates will take place if even
 * one of the fields were invalid. If the user updates their email address to something other than their current
 * address, they must be logged out because the current access token will be invalid until they verify their new email
 * address.
 *
 * If the user updates their email address, they'll be required to verify it before their next login via an email which
 * is sent to it. This means they'll be locked out of their account if they provide an invalid address, and will have
 * to contact the service's admin to correctly update their address. This mistake can be prevented by asking them to
 * confirm their address. For example, a UI could require the user to enter their email address twice if they're
 * updating it, and only allow the update to take place if both the entered addresses match.
 * @returns `null` if the operation succeeded.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function updateAccount(
  config: HttpApiConfig,
  accessToken: string,
  update: AccountUpdate,
): Promise<GraphQlResponse<UpdateAccountData>> {
  const { __typename, ...data } = update;
  return await queryOrMutate(
    config,
    {
      query: `
        mutation UpdateAccount($update: AccountUpdate!) {
          updateAccount(update: $update) {
            ${UPDATED_ACCOUNT_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { update: data },
    },
    accessToken,
  );
}
