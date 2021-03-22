import { SearchChatMessagesResult } from '../models';
import { HttpApiConfig } from '../../config';
import { BackwardPagination } from '../pagination';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { SEARCH_CHAT_MESSAGES_RESULT_FRAGMENT } from '../fragments';

export interface SearchChatMessagesData {
  readonly searchChatMessages: SearchChatMessagesResult;
}

/**
 * @param accessToken - Required if the chat isn't public.
 * @param query - Used to case-insensitively queries text messages, poll message title and options, action message text
 * and actions, and pic message captions.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 * @returns A returned {@link InvalidChatId} indicates that the chat isn't public, and the user isn't in the chat.
 * {@link MessageEdge}s are chronologically ordered.
 */
export async function searchChatMessages(
  config: HttpApiConfig,
  accessToken: string | undefined,
  chatId: number,
  query: string,
  pagination?: BackwardPagination,
): Promise<GraphQlResponse<SearchChatMessagesData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query SearchChatMessages($chatId: Int!, $query: String!, $last: Int, $before: Cursor) {
          searchChatMessages(chatId: $chatId, query: $query, last: $last, before: $before) {
            ${SEARCH_CHAT_MESSAGES_RESULT_FRAGMENT}
          }
        }
      `,
      variables: {
        chatId,
        query,
        last: pagination?.last,
        before: pagination?.before,
      },
    },
    accessToken,
  );
}
