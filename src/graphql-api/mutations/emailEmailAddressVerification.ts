import { EmailEmailAddressVerificationResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { EMAIL_EMAIL_ADDRESS_VERIFICATION_RESULT_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface EmailEmailAddressVerificationData {
  readonly emailEmailAddressVerification: EmailEmailAddressVerificationResult | null;
}

/**
 * Sends the user an email to verify their `emailAddress`. An example use case for this operation is when the user
 * created an account (which caused an email address verification email to be sent) but accidentally deleted the email,
 * and therefore requires it to be resent.
 * @returns `null` will be returned if the operation succeeded.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function emailEmailAddressVerification(
  config: HttpApiConfig,
  emailAddress: string,
): Promise<GraphQlResponse<EmailEmailAddressVerificationData>> {
  return await queryOrMutate(config, {
    query: `
      mutation EmailEmailAddressVerification($emailAddress: String!) {
        emailEmailAddressVerification(emailAddress: $emailAddress) {
          ${EMAIL_EMAIL_ADDRESS_VERIFICATION_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { emailAddress },
  });
}
