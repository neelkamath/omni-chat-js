import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';

export interface DeleteContact {
  readonly deleteContact: boolean;
}

/**
 * Deletes the specified user from the user's contacts.
 * @returns `true` if the contact got deleted. `false` if the `id` was either not a contact or a nonexistent user ID.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function deleteContact(
  config: HttpApiConfig,
  accessToken: string,
  id: number,
): Promise<GraphQlResponse<DeleteContact>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeleteContact($id: Int!) {
          deleteContact(id: $id)
        }
      `,
      variables: { id },
    },
    accessToken,
  );
}
