import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface UnblockUserData {
  readonly unblockUser: Placeholder;
}

/**
 * Unblocks the specified user. Does nothing if the they weren't blocked.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function unblockUser(
  config: HttpApiConfig,
  accessToken: string,
  id: number,
): Promise<GraphQlResponse<UnblockUserData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation UnblockUser($id: Int!) {
          unblockUser(id: $id)
        }
      `,
      variables: { id },
    },
    accessToken,
  );
}
