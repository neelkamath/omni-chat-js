import { OnlineStatusesSubscription } from '../models';
import { WsApiConfig } from '../../config';
import { OnSocketClose, OnSocketError, OnSocketMessage, subscribe } from '../operator';
import { ONLINE_STATUSES_SUBSCRIPTION_FRAGMENT } from '../fragments';

export interface SubscribeToOnlineStatusesData {
  readonly subscribeToOnlineStatuses: OnlineStatusesSubscription;
}

/**
 * Yields the online statuses of users the user has in their contacts, or has a chat with. The subscription will be
 * stopped if the user deletes their account.
 */
export function subscribeToOnlineStatuses(
  config: WsApiConfig,
  accessToken: string,
  onMessage: OnSocketMessage<SubscribeToOnlineStatusesData>,
  onError: OnSocketError,
): OnSocketClose {
  return subscribe(
    config,
    accessToken,
    '/online-statuses-subscription',
    `
      subscription SubscribeToOnlineStatuses {
        subscribeToOnlineStatuses {
          ${ONLINE_STATUSES_SUBSCRIPTION_FRAGMENT}
        }
      }
    `,
    onMessage,
    onError,
  );
}
