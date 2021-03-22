import { AccountInput, CreateAccountResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CREATE_ACCOUNT_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface CreateAccountData {
  readonly createAccount: CreateAccountResult | null;
}

/**
 * Creates an account, and sends the user a verification email. The user will not be allowed to log in until they verify
 * their email address. Use {@link verifyEmailAddress} to verify the user's email address.
 * @returns `null` if the operation succeeded.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function createAccount(
  config: HttpApiConfig,
  account: AccountInput,
): Promise<GraphQlResponse<CreateAccountData>> {
  const { __typename, ...data } = account;
  return await queryOrMutate(config, {
    query: `
      mutation CreateAccount($account: AccountInput!) {
        createAccount(account: $account) {
          ${CREATE_ACCOUNT_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { account: data },
  });
}
