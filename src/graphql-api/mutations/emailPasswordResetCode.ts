import { UnregisteredEmailAddress } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { UNREGISTERED_EMAIL_ADDRESS_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface EmailPasswordResetCodeData {
  readonly emailPasswordResetCode: UnregisteredEmailAddress | null;
}

/**
 * Sends a password reset email to the supplied `emailAddress`. The email will contain a password reset code which must
 * then be passed to {@link resetPassword}.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 * @see {@link updateAccount} Use if the user is logged in (i.e., you have an access token), and wants to update their
 * password.
 * @return `null` if the operation succeeded.
 */
export async function emailPasswordResetCode(
  config: HttpApiConfig,
  emailAddress: string,
): Promise<GraphQlResponse<EmailPasswordResetCodeData>> {
  return await queryOrMutate(config, {
    query: `
      mutation EmailPasswordResetCode($emailAddress: String!) {
        emailPasswordResetCode(emailAddress: $emailAddress) {
          ${UNREGISTERED_EMAIL_ADDRESS_FRAGMENT}
        }
      }
    `,
    variables: { emailAddress },
  });
}
