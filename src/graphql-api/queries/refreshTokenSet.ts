import { HttpApiConfig } from '../../config';
import { TokenSet } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { TOKEN_SET_FRAGMENT } from '../fragments';

export interface RefreshTokenSetData {
  readonly refreshTokenSet: TokenSet;
}

/**
 * The access token is short-lived. Once it expires, the user would have to log in again. This can be avoided by passing
 * the {@link TokenSet.refreshToken} from {@link requestTokenSet} here to request a new {@link TokenSet}.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function refreshTokenSet(
  config: HttpApiConfig,
  refreshToken: string,
): Promise<GraphQlResponse<RefreshTokenSetData>> {
  return await queryOrMutate(config, {
    query: `
      query RefreshTokenSet($refreshToken: ID!) {
        refreshTokenSet(refreshToken: $refreshToken) {
          ${TOKEN_SET_FRAGMENT}
        }
      }
    `,
    variables: { refreshToken },
  });
}
