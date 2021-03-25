import { MessagesSubscription } from '../models';
import { WsApiConfig } from '../../config';
import { OnSocketClose, OnSocketError, OnSocketMessage, subscribe } from '../operator';
import { MESSAGES_SUBSCRIPTION_FRAGMENT } from '../fragments';

export interface SubscribeToMessagesData {
  readonly subscribeToMessages: MessagesSubscription;
}

/**
 * Yields created, updated, and deleted messages (including the user's own) in every chat the user is in. A message from
 * a chat the user wasn't previously in can be sent as well (e.g., when the other user in a private chat the user
 * deleted sends a message in it). The subscription will be stopped if the user deletes their account.
 */
export function subscribeToMessages(
  config: WsApiConfig,
  accessToken: string,
  onMessage: OnSocketMessage<SubscribeToMessagesData>,
  onError: OnSocketError,
): OnSocketClose {
  return subscribe(
    config,
    accessToken,
    '/messages-subscription',
    `
      subscription SubscribeToMessages {
        subscribeToMessages {
          ${MESSAGES_SUBSCRIPTION_FRAGMENT}
        }
      }
    `,
    onMessage,
    onError,
  );
}
