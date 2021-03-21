import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface CreateContactsData {
  readonly createContacts: Placeholder;
}

/**
 * Saves contacts. Previously saved contacts, nonexistent users, and the user's own ID will be ignored.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function createContacts(
  config: HttpApiConfig,
  accessToken: string,
  idList: number[],
): Promise<GraphQlResponse<CreateContactsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation CreateContacts($idList: [Int!]!) {
          createContacts(idList: $idList)
        }
      `,
      variables: { idList },
    },
    accessToken,
  );
}
