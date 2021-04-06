import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';

export interface CreateContact {
  readonly createContact: boolean;
}

/**
 * Saves the `id` as a contact.
 * @returns `true` if the contact got saved. `false` if the `id` was either a preexisting contact or a nonexistent user
 * ID.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createContact(
  config: HttpApiConfig,
  accessToken: string,
  id: number,
): Promise<GraphQlResponse<CreateContact>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreateContact($id: Int!) {
          createContact(id: $id)
        }
      `,
      variables: { id },
    },
    accessToken,
  );
}
