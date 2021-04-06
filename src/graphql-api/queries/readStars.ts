import { StarredMessagesConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { STARRED_MESSAGES_CONNECTION_FRAGMENT } from '../fragments';
import { ForwardPagination } from '../pagination';

export interface ReadStarsData {
  readonly readStars: StarredMessagesConnection;
}

/**
 * @returns the user's starred messages.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function readStars(
  config: HttpApiConfig,
  accessToken: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<ReadStarsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query ReadStars($first: Int, $after: Cursor) {
          readStars(first: $first, after: $after) {
            ${STARRED_MESSAGES_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: { first: pagination?.first, after: pagination?.after },
    },
    accessToken,
  );
}
