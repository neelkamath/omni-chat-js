import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface DeleteProfilePicData {
  readonly deleteProfilePic: Placeholder;
}

/**
 * Deletes the user's profile pic.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function deleteProfilePic(
  config: HttpApiConfig,
  accessToken: string,
): Promise<GraphQlResponse<DeleteProfilePicData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeleteProfilePic {
          deleteProfilePic
        }
      `,
    },
    accessToken,
  );
}
