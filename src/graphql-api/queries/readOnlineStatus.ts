import { ReadOnlineStatusResult } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { READ_ONLINE_STATUS_RESULT_FRAGMENT } from '../fragments';

export interface ReadOnlineStatusData {
  readonly readOnlineStatus: ReadOnlineStatusResult;
}

/**
 * Whether the specified user is online.
 * @returns {@link OnlineStatus} if the `userId` exists, and an {@link InvalidUserId} otherwise.
 */
export async function readOnlineStatus(
  config: HttpApiConfig,
  userId: number,
): Promise<GraphQlResponse<ReadOnlineStatusData>> {
  return await queryOrMutate(config, {
    query: `
      query ReadOnlineStatus($userId: Int!) {
        readOnlineStatus(userId: $userId) {
          ${READ_ONLINE_STATUS_RESULT_FRAGMENT}
        }
      }
    `,
    variables: { userId },
  });
}
