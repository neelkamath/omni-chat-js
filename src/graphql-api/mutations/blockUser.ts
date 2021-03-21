import { InvalidUserId } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { INVALID_USER_ID_FRAGMENT } from '../fragments';
import { HttpApiConfig } from '../../config';

export interface BlockUserData {
  readonly blockUser: InvalidUserId | null;
}

/**
 * Blocks the specified user. Does nothing if they've already been blocked, or the user is blocking themselves.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 * @returns `null` if the operation succeeded.
 */
export async function blockUser(
  config: HttpApiConfig,
  accessToken: string,
  id: number,
): Promise<GraphQlResponse<BlockUserData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation BlockUser($id: Int!) {
          blockUser(id: $id) {
            ${INVALID_USER_ID_FRAGMENT}
          }
        }
      `,
      variables: { id },
    },
    accessToken,
  );
}
