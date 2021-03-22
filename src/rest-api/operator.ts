import { ContextMessageId, PicType } from './models';
import { ConnectionError, InternalServerError, UnauthorizedError } from '../errors';
import {
  InvalidAudioError,
  InvalidContextMessageError,
  InvalidDocError,
  InvalidVideoError,
  UserNotInChatError,
} from './errors';
import { HttpApiConfig } from '../config';

/**
 * @param accessToken - You needn't pass an access token if the chat is public.
 * @param type - The type of media to read.
 * @param messageId - The message to read the media from.
 * @param picType - Must be sent if retrieving a pic message.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function getMediaMessage(
  { apiUrl, protocol }: HttpApiConfig,
  accessToken: string | undefined,
  type: 'pic' | 'audio' | 'video' | 'doc',
  messageId: number,
  picType?: PicType,
): Promise<Blob> {
  const paramsInit: Record<string, string> = { 'message-id': messageId.toString() };
  if (picType !== undefined) paramsInit['pic-type'] = picType;
  const params = new URLSearchParams(paramsInit).toString();
  const headers: Record<string, string> = {};
  if (accessToken !== undefined) headers.Authorization = `Bearer ${accessToken}`;
  const response = await fetch(`${protocol}://${apiUrl}/${type}-message?${params}`, { headers });
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 200:
      return await response.blob();
    case 401:
      throw new UnauthorizedError();
    default:
      throw new ConnectionError();
  }
}

export type MediaType = 'audio' | 'video' | 'doc';

/**
 * Creates a media message. If the chat is a broadcast group, the user must be an admin.
 * @throws {@link InternalServerError}
 * @throws {@link UserNotInChatError}
 * @throws {@link InvalidAudioError}
 * @throws {@link InvalidVideoError}
 * @throws {@link InvalidDocError}
 * @throws {@link InvalidContextMessageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 */
export async function postMediaMessage(
  { apiUrl, protocol }: HttpApiConfig,
  accessToken: string,
  type: MediaType,
  file: File,
  chatId: number,
  contextMessageId?: ContextMessageId,
): Promise<void> {
  const params: Record<string, string> = { 'chat-id': chatId.toString() };
  if (contextMessageId !== undefined) params['context-message-id'] = contextMessageId.toString();
  const formData = new FormData();
  formData.append(type, file);
  const response = await fetch(`${protocol}://${apiUrl}/${type}-message?${params.toString()}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 204:
      return;
    case 400:
      throw readInvalidMessageError(await response.json(), type);
    case 401:
      throw new UnauthorizedError();
    default:
      throw new ConnectionError();
  }
}

interface InvalidMessage {
  readonly reason: 'USER_NOT_IN_CHAT' | 'INVALID_FILE' | 'INVALID_CONTEXT_MESSAGE';
}

function readInvalidMessageError(message: InvalidMessage, type: MediaType): Error {
  switch (message.reason) {
    case 'USER_NOT_IN_CHAT':
      return new UserNotInChatError();
    case 'INVALID_CONTEXT_MESSAGE':
      return new InvalidContextMessageError();
    case 'INVALID_FILE':
      switch (type) {
        case 'audio':
          return new InvalidAudioError();
        case 'video':
          return new InvalidVideoError();
        case 'doc':
          return new InvalidDocError();
      }
  }
}
