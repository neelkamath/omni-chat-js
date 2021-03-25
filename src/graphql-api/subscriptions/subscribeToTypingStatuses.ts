import { TypingStatusesSubscription } from '../models';
import { WsApiConfig } from '../../config';
import { OnSocketClose, OnSocketError, OnSocketMessage, subscribe } from '../operator';
import { TYPING_STATUSES_SUBSCRIPTION_FRAGMENT } from '../fragments';

export interface SubscribeToTypingStatusesData {
  readonly subscribeToTypingStatuses: TypingStatusesSubscription;
}

/**
 * Yields typing statuses for chats the user has. The user's own typing statuses won't be yielded. The subscription will
 * be stopped if the user deletes their account.
 */
export function subscribeToTypingStatuses(
  config: WsApiConfig,
  accessToken: string,
  onMessage: OnSocketMessage<SubscribeToTypingStatusesData>,
  onError: OnSocketError,
): OnSocketClose {
  return subscribe(
    config,
    accessToken,
    '/typing-statuses-subscription',
    `
      subscription SubscribeToTypingStatuses {
        subscribeToTypingStatuses {
          ${TYPING_STATUSES_SUBSCRIPTION_FRAGMENT}
        }
      }
    `,
    onMessage,
    onError,
  );
}
