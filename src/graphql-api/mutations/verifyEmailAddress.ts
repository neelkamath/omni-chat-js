import { VerifyEmailAddressResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { VERIFY_EMAIL_ADDRESS_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface VerifyEmailAddressData {
  readonly verifyEmailAddress: VerifyEmailAddressResult | null;
}

/**
 * When a user creates an account, or updates their email address, they'll receive an email with a `verificationCode`
 * which must be passed to this operation in order to verify their email address. If the `verificationCode` is valid,
 * the account's email address verification status will be set to verified, and `null` will be returned. Use
 * {@link}Mutation.emailEmailAddressVerification} if the user lost their verification code.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function verifyEmailAddress(
  config: HttpApiConfig,
  emailAddress: string,
  verificationCode: number,
): Promise<GraphQlResponse<VerifyEmailAddressData>> {
  return await queryOrMutate(config, {
    query: `
      mutation VerifyEmailAddress($emailAddress: String!, $verificationCode: Int!) {
        verifyEmailAddress(emailAddress: $emailAddress, verificationCode: $verificationCode) {
          ${VERIFY_EMAIL_ADDRESS_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { emailAddress, verificationCode },
  });
}
