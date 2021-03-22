import { HttpApiConfig } from '../../config';
import { MessageText, TriggerActionResult } from '../models';
import { GraphQlResponse, queryOrMutate } from '../operator';
import { TRIGGER_ACTION_RESULT_FRAGMENT } from '../fragments';

export interface TriggerActionData {
  readonly triggerAction: TriggerActionResult | null;
}

/**
 * Triggers the `action` on the `messageId`'s action message.
 * @returns `null` will be returned if the operation succeeded. An {@link InvalidMessageId} will be returned if there's
 * no such action message. An {@link InvalidAction} will be returned if the `action` doesn't exist.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function triggerAction(
  config: HttpApiConfig,
  accessToken: string,
  messageId: number,
  action: MessageText,
): Promise<GraphQlResponse<TriggerActionData>> {
  return await queryOrMutate(
    config,
    {
      query: `
        mutation TriggerAction($messageId: Int!, $action: MessageText!) {
          triggerAction(messageId: $messageId, action: $action) {
            ${TRIGGER_ACTION_RESULT_FRAGMENT}
          }
        }
      `,
      variables: { messageId, action },
    },
    accessToken,
  );
}
