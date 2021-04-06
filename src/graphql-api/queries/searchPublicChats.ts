import { GroupChatsConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { GROUP_CHATS_CONNECTION_FRAGMENT } from '../fragments';
import { ForwardPagination } from '../pagination';

export interface SearchPublicChatsData {
  readonly searchPublicChats: GroupChatsConnection;
}

/**
 * Case-insensitively searches chats by case-insensitively querying their titles.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 */
export async function searchPublicChats(
  config: HttpApiConfig,
  query: string,
  pagination?: ForwardPagination,
): Promise<GraphQlResponse<SearchPublicChatsData>> {
  return await queryOrMutate(config, {
    query: `
      query SearchPublicChats($query: String!, $first: Int, $after: Cursor) {
        searchPublicChats(query: $query, first: $first, after: $after) {
          ${GROUP_CHATS_CONNECTION_FRAGMENT}
        }
      }
    `,
    variables: { query, first: pagination?.first, after: pagination?.after },
  });
}
