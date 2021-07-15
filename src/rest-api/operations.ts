import { ConnectionError, InternalServerError, UnauthorizedError } from '../errors';
import {
  InvalidContextMessageError,
  InvalidImageError,
  MessageTextScalarError,
  MustBeAdminError,
  NonexistentChatError,
  NonexistentUserIdError,
  UserNotInChatError,
} from './errors';
import { AudioFile, ContextMessageId, DocFile, ImageFile, ImageType, VideoFile } from './models';
import { extractFilename, getMediaMessage, postMediaMessage } from './operator';
import { HttpApiConfig } from '../config';
import { MessageText } from '../graphql-api';

/**
 * @return {ImageFile | null} if the user has a profile image, and `null` if they don't.
 * @throws {@link NonexistentUserIdError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function getProfileImage(
  { apiUrl, protocol }: HttpApiConfig,
  userId: number,
  imageType: ImageType,
): Promise<ImageFile | null> {
  const params = new URLSearchParams({
    'user-id': userId.toString(),
    'image-type': imageType,
  }).toString();
  const response = await fetch(`${protocol}://${apiUrl}/profile-image?${params}`);
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 200:
      return { filename: extractFilename(response), blob: await response.blob() };
    case 204:
      return null;
    case 400:
      throw new NonexistentUserIdError();
    default:
      throw new ConnectionError();
  }
}

/**
 * Update the user's profile image.
 * @throws {@link InvalidImageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function patchProfileImage(
  { apiUrl, protocol }: HttpApiConfig,
  accessToken: string,
  image: File,
): Promise<void> {
  const formData = new FormData();
  formData.append('image', image);
  const response = await fetch(`${protocol}://${apiUrl}/profile-image`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 204:
      return;
    case 400:
      throw new InvalidImageError();
    case 401:
      throw new UnauthorizedError();
    default:
      throw new ConnectionError();
  }
}

/**
 * Retrieves the group chat's image. Otherwise, the user must be a participant to view the pic.
 * @return {ImageFile | null} if the chat has a image, and `null` otherwise.
 * @throws {@link NonexistentChatError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function getGroupChatImage(
  { apiUrl, protocol }: HttpApiConfig,
  chatId: number,
  imageType: ImageType,
): Promise<ImageFile | null> {
  const params = new URLSearchParams({
    'chat-id': chatId.toString(),
    'image-type': imageType,
  }).toString();
  const response = await fetch(`${protocol}://${apiUrl}/group-chat-image?${params}`);
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 200:
      return { filename: extractFilename(response), blob: await response.blob() };
    case 204:
      return null;
    case 400:
      throw new NonexistentChatError();
    default:
      throw new ConnectionError();
  }
}

/**
 * Update the group chat's image. The user must be an admin of the chat.
 * @throws {@link InvalidImageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function patchGroupChatImage(
  { apiUrl, protocol }: HttpApiConfig,
  accessToken: string,
  chatId: number,
  image: File,
): Promise<void> {
  const params = new URLSearchParams({
    'chat-id': chatId.toString(),
  }).toString();
  const formData = new FormData();
  formData.append('image', image);
  const response = await fetch(`${protocol}://${apiUrl}/group-chat-image?${params}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 204:
      return;
    case 400:
      throw new InvalidImageError();
    case 401:
      throw new UnauthorizedError();
    default:
      throw new ConnectionError();
  }
}

/**
 * Reads the image from a message. To get the caption, use the GraphQL API. You needn't pass an access token if the chat
 * is public.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function getImageMessage(
  config: HttpApiConfig,
  accessToken: string | undefined,
  messageId: number,
  imageType: ImageType,
): Promise<ImageFile> {
  return await getMediaMessage(config, accessToken, 'image', messageId, imageType);
}

/**
 *
 * Creates an image message.
 * @throws {@link UserNotInChatError}
 * @throws {@link InvalidImageError}
 * @throws {@link InvalidContextMessageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 * @throws {@link MessageTextScalarError}
 */
export async function postImageMessage(
  { apiUrl, protocol }: HttpApiConfig,
  accessToken: string,
  image: File,
  chatId: number,
  contextMessageId?: ContextMessageId,
  caption?: MessageText,
): Promise<void> {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('chat-id', chatId.toString());
  if (contextMessageId !== undefined) formData.append('context-message-id', contextMessageId.toString());
  if (caption !== undefined) formData.append('caption', caption);
  const response = await fetch(`${protocol}://${apiUrl}/image-message`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
  switch (response.status) {
    case 204:
      return;
    case 400: {
      const json = await response.json();
      switch (json.reason) {
        case 'USER_NOT_IN_CHAT':
          throw new UserNotInChatError();
        case 'INVALID_FILE':
          throw new InvalidImageError();
        case 'INVALID_CONTEXT_MESSAGE':
          throw new InvalidContextMessageError();
        case 'INVALID_CAPTION':
          throw new MessageTextScalarError();
        case 'MUST_BE_ADMIN':
          throw new MustBeAdminError();
      }
      break;
    }
    case 401:
      throw new UnauthorizedError();
    default:
      throw new ConnectionError();
  }
}

/**
 * Reads an audio message. You needn't pass an access token if the chat is public.
 * @throws {@link InternalServerError}
 * @throws {@link ConnectionError}
 * @throws {@link UnauthorizedError}
 */
export async function getAudioMessage(
  config: HttpApiConfig,
  accessToken: string | undefined,
  messageId: number,
): Promise<AudioFile> {
  return await getMediaMessage(config, accessToken, 'audio', messageId);
}

/**
 * Creates an audio message.
 * @throws {@link InternalServerError}
 * @throws {@link UserNotInChatError}
 * @throws {@link InvalidAudioError}
 * @throws {@link InvalidContextMessageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 */
export async function postAudioMessage(
  config: HttpApiConfig,
  accessToken: string,
  audio: File,
  chatId: number,
  contextMessageId?: ContextMessageId,
): Promise<void> {
  await postMediaMessage(config, accessToken, 'audio', audio, chatId, contextMessageId);
}

/**
 * Reads a video message. You needn't pass an access token if the chat is public.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function getVideoMessage(
  config: HttpApiConfig,
  accessToken: string | undefined,
  messageId: number,
): Promise<VideoFile> {
  return await getMediaMessage(config, accessToken, 'video', messageId);
}

/**
 * Creates a video message.
 * @throws {@link InternalServerError}
 * @throws {@link UserNotInChatError}
 * @throws {@link InvalidVideoError}
 * @throws {@link InvalidContextMessageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 */
export async function postVideoMessage(
  config: HttpApiConfig,
  accessToken: string,
  video: File,
  chatId: number,
  contextMessageId?: ContextMessageId,
): Promise<void> {
  await postMediaMessage(config, accessToken, 'video', video, chatId, contextMessageId);
}

/**
 * Reads a doc message. You needn't pass an access token if the chat is public.
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 * @throws {@link InternalServerError}
 */
export async function getDocMessage(
  config: HttpApiConfig,
  accessToken: string | undefined,
  messageId: number,
): Promise<DocFile> {
  return await getMediaMessage(config, accessToken, 'doc', messageId);
}

/**
 * Creates a doc message.
 * @throws {@link InternalServerError}
 * @throws {@link UserNotInChatError}
 * @throws {@link InvalidDocError}
 * @throws {@link InvalidContextMessageError}
 * @throws {@link UnauthorizedError}
 * @throws {@link ConnectionError}
 */
export async function postDocMessage(
  config: HttpApiConfig,
  accessToken: string,
  doc: File,
  chatId: number,
  contextMessageId?: ContextMessageId,
): Promise<void> {
  await postMediaMessage(config, accessToken, 'doc', doc, chatId, contextMessageId);
}

/**
 * Check if all systems are operational. For example, a backend developer building atop Omni Chat can program the server
 * to automatically restart when it becomes "unhealthy".
 * @returns Whether the backend is "healthy".
 */
export async function getHealthCheck({ apiUrl, protocol }: HttpApiConfig): Promise<boolean> {
  const response = await fetch(`${protocol}://${apiUrl}/health-check`);
  return response.status === 204;
}
