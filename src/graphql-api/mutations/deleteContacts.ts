import { Placeholder } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { HttpApiConfig } from '../../config';

export interface DeleteContactsData {
  readonly deleteContacts: Placeholder;
}

/**
 * Remove saved contacts. Invalid contacts (e.g., invalid user IDs, unsaved contacts) will be ignored.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function deleteContacts(
  config: HttpApiConfig,
  accessToken: string,
  idList: number[],
): Promise<GraphQlResponse<DeleteContactsData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation DeleteContacts($idList: [Int!]!) {
          deleteContacts(idList: $idList)
        }
      `,
      variables: { idList },
    },
    accessToken,
  );
}
