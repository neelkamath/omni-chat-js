import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface SetOnlineData {
  readonly setOnline: Placeholder;
}

/**
 * Sets whether the user is currently online.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function setOnline(
  config: HttpApiConfig,
  accessToken: string,
  isOnline: boolean,
): Promise<GraphQlResponse<SetOnlineData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation SetOnline($isOnline: Boolean!) {
          setOnline(isOnline: $isOnline)
        }
      `,
      variables: { isOnline },
    },
    accessToken,
  );
}
