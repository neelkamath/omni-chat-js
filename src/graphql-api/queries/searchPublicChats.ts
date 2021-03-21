import { GroupChat } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { GROUP_CHAT_FRAGMENT } from '../fragments';

export interface SearchPublicChatsData {
  readonly searchPublicChats: GroupChat[];
}

/**
 * Case-insensitively searches chats by case-insensitively querying their titles.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 */
export async function searchPublicChats(
  config: HttpApiConfig,
  query: string,
): Promise<GraphQlResponse<SearchPublicChatsData>> {
  return await queryOrMutate(config, {
    query: `
      query SearchPublicChats($query: String!) {
        searchPublicChats(query: $query) {
          ${GROUP_CHAT_FRAGMENT}
        }
      }
    `,
    variables: { query },
  });
}
