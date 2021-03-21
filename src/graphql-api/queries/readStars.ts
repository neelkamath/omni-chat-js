import { StarredMessage } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { STARRED_MESSAGE_FRAGMENT } from '../fragments';

export interface ReadStarsData {
  readonly readStars: StarredMessage[];
}

/**
 * @returns the user's starred messages.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function readStars(config: HttpApiConfig, accessToken: string): Promise<GraphQlResponse<ReadStarsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query ReadStars {
          readStars {
            ${STARRED_MESSAGE_FRAGMENT}
          }
        }
      `,
    },
    accessToken,
  );
}
