import { TYPING_USERS_FRAGMENT } from '../fragments';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { TypingUsers } from '../models';
import { HttpApiConfig } from '../../config';

export interface ReadTypingUsersData {
  readonly readTypingUsers: TypingUsers[];
}

/**
 * @returns The users who are typing in a chat the user is in. The user's own status won't be returned.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function readTypingUsers(
  config: HttpApiConfig,
  accessToken: string,
): Promise<GraphQlResponse<ReadTypingUsersData>> {
  return await queryOrMutate(
    config,
    {
      query: `
      query ReadTypingUsers {
        readTypingUsers {
          ${TYPING_USERS_FRAGMENT}
        }
      }
    `,
    },
    accessToken,
  );
}
