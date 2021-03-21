import { HttpApiConfig } from '../../config';
import { Login, RequestTokenSetResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { REQUEST_TOKEN_SET_RESULT_FRAGMENT } from '../fragments';

export interface RequestTokenSetData {
  readonly requestTokenSet: RequestTokenSetResult;
}

/**
 * Certain operations require authentication via an access token. You can acquire one to authenticate the user by
 * passing their {@link Login} to this operation.
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 * @see {@link refreshTokenSet}
 */
export async function requestTokenSet(
  config: HttpApiConfig,
  login: Login,
): Promise<GraphQlResponse<RequestTokenSetData>> {
  const { __typename, ...loginData } = login;
  return await queryOrMutate(config, {
    query: `
      query RequestTokenSet($login: Login!) {
        requestTokenSet(login: $login) {
          ${REQUEST_TOKEN_SET_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { login: loginData },
  });
}
