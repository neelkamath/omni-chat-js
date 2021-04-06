import { ChatMessagesConnection } from '../models';
import { HttpApiConfig } from '../../config';
import { BackwardPagination, ForwardPagination } from '../pagination';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { CHAT_MESSAGES_CONNECTION_FRAGMENT } from '../fragments';

export interface SearchMessagesData {
  readonly searchMessages: ChatMessagesConnection;
}

/**
 * Case-insensitively queries every text messages, poll message title and options, action message text and actions, and
 * pic message captions in every chat the user is in.
 * @returns Each {@link ChatMessages} will be for a particular {@link ChatMessages.chat}, and have the
 * {@link ChatMessages.messages} from the search results.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function searchMessages(
  config: HttpApiConfig,
  accessToken: string,
  query: string,
  pagination?: ForwardPagination,
  privateChatMessagesPagination?: BackwardPagination,
  groupChatUsersPagination?: ForwardPagination,
  groupChatMessagesPagination?: BackwardPagination,
): Promise<GraphQlResponse<SearchMessagesData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        query SearchMessages(
          $query: String!
          $first: Int
          $after: Cursor
          $privateChat_messages_last: Int
          $privateChat_messages_before: Cursor
          $groupChat_users_first: Int
          $groupChat_users_after: Cursor
          $groupChat_messages_last: Int
          $groupChat_messages_before: Cursor
        ) {
          searchMessages(query: $query, first: $first, after: $after) {
            ${CHAT_MESSAGES_CONNECTION_FRAGMENT}
          }
        }
      `,
      variables: {
        query,
        first: pagination?.first,
        after: pagination?.after,
        privateChat_messages_last: privateChatMessagesPagination?.last,
        privateChat_messages_before: privateChatMessagesPagination?.before,
        groupChat_users_first: groupChatUsersPagination?.first,
        groupChat_users_after: groupChatUsersPagination?.after,
        groupChat_messages_last: groupChatMessagesPagination?.last,
        groupChat_messages_before: groupChatMessagesPagination?.before,
      },
    },
    accessToken,
  );
}
