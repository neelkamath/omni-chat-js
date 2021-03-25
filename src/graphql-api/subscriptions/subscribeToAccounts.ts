import { AccountsSubscription } from '../models';
import { WsApiConfig } from '../../config';
import { OnSocketClose, OnSocketError, OnSocketMessage, subscribe } from '../operator';
import { ACCOUNTS_SUBSCRIPTION_FRAGMENT } from '../fragments';

export interface SubscribeToAccountsData {
  readonly subscribeToAccounts: AccountsSubscription;
}

/**
 * Yields updates on the user's contacts, the subscriber's account, and accounts of users the subscriber has a chat
 * with. The subscription will be stopped if the user deletes their account.
 */
export function subscribeToAccounts(
  config: WsApiConfig,
  accessToken: string,
  onMessage: OnSocketMessage<SubscribeToAccountsData>,
  onError: OnSocketError,
): OnSocketClose {
  return subscribe(
    config,
    accessToken,
    '/accounts-subscription',
    `
      subscription SubscribeToAccounts {
        subscribeToAccounts {
          ${ACCOUNTS_SUBSCRIPTION_FRAGMENT}
        }
      }
    `,
    onMessage,
    onError,
  );
}
