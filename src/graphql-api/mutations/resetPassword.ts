import { ResetPasswordResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { RESET_PASSWORD_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface ResetPasswordData {
  readonly resetPassword: ResetPasswordResult | null;
}

/**
 * Updates the password of the account associated with the `emailAddress` to the `newPassword` if the
 * `passwordResetCode` is correct, and returns `null`.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function resetPassword(
  config: HttpApiConfig,
  emailAddress: string,
  passwordResetCode: number,
  newPassword: string,
): Promise<GraphQlResponse<ResetPasswordData>> {
  return await queryOrMutate(config, {
    query: `
      mutation ResetPassword($emailAddress: String!, $passwordResetCode: Int!, $newPassword: Password!) {
        resetPassword(emailAddress: $emailAddress, passwordResetCode: $passwordResetCode, newPassword: $newPassword) {
          ${RESET_PASSWORD_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { emailAddress, passwordResetCode, newPassword },
  });
}
