import { HttpApiConfig } from '../../config';
import { MessageText, SetPollVoteResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { SET_POLL_VOTE_RESULT_FRAGMENT } from '../fragments';

export interface SetPollVoteData {
  readonly setPollVote: SetPollVoteResult | null;
}

/**
 * Updates the user's vote for the `option` on the `messageId`'s poll.
 * @param vote - If `true`, the user's vote will be added if it hasn't already. If `false`, the user's vote will be
 * removed if there is one.
 * @returns `null` will be returned if the operation succeeded. An {@link InvalidMessageId} will be returned if there's
 * no such poll message.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function setPollVote(
  config: HttpApiConfig,
  accessToken: string,
  messageId: number,
  option: MessageText,
  vote: boolean,
): Promise<GraphQlResponse<SetPollVoteResult>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation SetPollVote($messageId: Int!, $option: $MessageText!, $vote: Boolean!) {
          setPollVote(messageId: $messageId, option: $option, vote: $vote) {
            ${SET_POLL_VOTE_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { messageId, option, vote },
    },
    accessToken,
  );
}
