import { GroupChatsSubscription } from '../models';
import { WsApiConfig } from '../../config';
import { OnSocketClose, OnSocketError, OnSocketMessage, subscribe } from '../operator';
import { GROUP_CHATS_SUBSCRIPTION_FRAGMENT } from '../fragments';

export interface SubscribeToGroupChatsData {
  readonly subscribeToGroupChats: GroupChatsSubscription;
}

/**
 * Yields group chats the user was added to (including chats they created), and group chat metadata updates. The
 * subscription will be stopped if the user deletes their account.
 */
export function subscribeToGroupChats(
  config: WsApiConfig,
  accessToken: string,
  onMessage: OnSocketMessage<SubscribeToGroupChatsData>,
  onError: OnSocketError,
): OnSocketClose {
  return subscribe(
    config,
    accessToken,
    '/group-chats-subscription',
    `
      subscription SubscribeToGroupChats {
        subscribeToGroupChats {
          ${GROUP_CHATS_SUBSCRIPTION_FRAGMENT}
        }
      }
    `,
    onMessage,
    onError,
  );
}
