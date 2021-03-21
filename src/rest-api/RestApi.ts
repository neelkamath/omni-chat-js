import { ConnectionError, InternalServerError, UnauthorizedError } from '../errors';
import {
  InvalidContextMessageError,
  InvalidPicError,
  MessageTextScalarError,
  NonexistentChatError,
  NonexistentUserIdError,
  UserNotInChatError,
} from './errors';
import { Audio, ContextMessageId, Doc, Pic, PicType, Video } from './models';
import { MessageText } from '../graphql-api/models';
import { getMediaMessage, postMediaMessage } from './operator';
import { ApiUrl, HttpProtocol } from '../config';

/** REST API. */
export class RestApi {
  constructor(private readonly protocol: HttpProtocol, private readonly apiUrl: ApiUrl) {}

  /**
   * @return `Blob` if the user has a profile pic, and `null` if they don't.
   * @throws {@link NonexistentUserIdError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async getProfilePic(userId: number, picType: PicType): Promise<Pic | null> {
    const params = new URLSearchParams({
      'user-id': userId.toString(),
      'pic-type': picType,
    }).toString();
    const response = await fetch(`${this.protocol}://${this.apiUrl}/profile-pic?${params}`);
    if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
    switch (response.status) {
      case 200:
        return await response.blob();
      case 204:
        return null;
      case 400:
        throw new NonexistentUserIdError();
      default:
        throw new ConnectionError();
    }
  }

  /**
   * Update the user's profile pic.
   * @throws {@link InvalidPicError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async patchProfilePic(accessToken: string, pic: File): Promise<void> {
    const formData = new FormData();
    formData.append('pic', pic);
    const response = await fetch(`${this.protocol}://${this.apiUrl}/profile-pic`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    });
    if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
    switch (response.status) {
      case 204:
        return;
      case 400:
        throw new InvalidPicError();
      case 401:
        throw new UnauthorizedError();
      default:
        throw new ConnectionError();
    }
  }

  /**
   * Retrieves the group chat's pic. An access token needn't be sent if the chat is public. Otherwise, the user must be
   * a participant to view the pic.
   * @return `Pic` if the chat has a pic, and `null` otherwise.
   * @throws {@link NonexistentChatError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async getGroupChatPic(accessToken: string | undefined, chatId: number, picType: PicType): Promise<Pic | null> {
    const params = new URLSearchParams({
      'chat-id': chatId.toString(),
      'pic-type': picType,
    }).toString();
    const headers: Record<string, string> = {};
    if (accessToken !== null) headers.Authorization = `Bearer ${accessToken}`;
    const response = await fetch(`${this.protocol}://${this.apiUrl}/group-chat-pic?${params}`, { headers });
    if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
    switch (response.status) {
      case 200:
        return await response.blob();
      case 204:
        return null;
      case 400:
        throw new NonexistentChatError();
      default:
        throw new ConnectionError();
    }
  }

  /**
   * Update the group chat's pic. The user must be an admin of the chat.
   * @throws {@link InvalidPicError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async patchGroupChatPic(accessToken: string, chatId: number, pic: File): Promise<void> {
    const params = new URLSearchParams({
      'chat-id': chatId.toString(),
    }).toString();
    const formData = new FormData();
    formData.append('pic', pic);
    const response = await fetch(`${this.protocol}://${this.apiUrl}/group-chat-pic?${params}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    });
    if (response.status >= 500 && response.status <= 599) throw new InternalServerError();
    switch (response.status) {
      case 204:
        return;
      case 400:
        throw new InvalidPicError();
      case 401:
        throw new UnauthorizedError();
      default:
        throw new ConnectionError();
    }
  }

  /**
   * Reads the pic from a message. To get the caption, use the GraphQL API. You needn't pass an access token if the chat
   * is public.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async getPicMessage(accessToken: string | undefined, messageId: number, picType: PicType): Promise<Pic> {
    return await getMediaMessage(this.protocol, this.apiUrl, accessToken, 'pic', messageId, picType);
  }

  /**
   *
   * Creates a pic message. If the chat is a broadcast group, the user must be an admin.
   * @throws {@link UserNotInChatError}
   * @throws {@link InvalidPicError}
   * @throws {@link InvalidContextMessageError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   * @throws {@link MessageTextScalarError}
   */
  async postPicMessage(
    accessToken: string,
    pic: File,
    chatId: number,
    contextMessageId?: ContextMessageId,
    caption?: MessageText,
  ): Promise<void> {
    const formData = new FormData();
    formData.append('pic', pic);
    formData.append('chat-id', chatId.toString());
    if (contextMessageId !== undefined) formData.append('context-message-id', contextMessageId.toString());
    if (caption !== undefined) formData.append('caption', caption);
    const response = await fetch(`${this.protocol}://${this.apiUrl}/pic-message`, {
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
            throw new InvalidPicError();
          case 'INVALID_CONTEXT_MESSAGE':
            throw new InvalidContextMessageError();
          case 'INVALID_CAPTION':
            throw new MessageTextScalarError();
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
  async getAudioMessage(accessToken: string | undefined, messageId: number): Promise<Audio> {
    return await getMediaMessage(this.protocol, this.apiUrl, accessToken, 'audio', messageId);
  }

  /**
   * Creates an audio message. If the chat is a broadcast group, the user must be an admin.
   * @throws {@link InternalServerError}
   * @throws {@link UserNotInChatError}
   * @throws {@link InvalidAudioError}
   * @throws {@link InvalidContextMessageError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   */
  async postAudioMessage(
    accessToken: string,
    audio: File,
    chatId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<void> {
    await postMediaMessage(this.protocol, this.apiUrl, accessToken, 'audio', audio, chatId, contextMessageId);
  }

  /**
   * Reads a video message. You needn't pass an access token if the chat is public.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async getVideoMessage(accessToken: string | undefined, messageId: number): Promise<Video> {
    return await getMediaMessage(this.protocol, this.apiUrl, accessToken, 'video', messageId);
  }

  /**
   * Creates a video message. If the chat is a broadcast group, the user must be an admin.
   * @throws {@link InternalServerError}
   * @throws {@link UserNotInChatError}
   * @throws {@link InvalidVideoError}
   * @throws {@link InvalidContextMessageError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   */
  async postVideoMessage(
    accessToken: string,
    video: File,
    chatId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<void> {
    await postMediaMessage(this.protocol, this.apiUrl, accessToken, 'video', video, chatId, contextMessageId);
  }

  /**
   * Reads a doc message. You needn't pass an access token if the chat is public.
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   * @throws {@link InternalServerError}
   */
  async getDocMessage(accessToken: string | undefined, messageId: number): Promise<Doc> {
    return await getMediaMessage(this.protocol, this.apiUrl, accessToken, 'doc', messageId);
  }

  /**
   * Creates a doc message. If the chat is a broadcast group, the user must be an admin.
   * @throws {@link InternalServerError}
   * @throws {@link UserNotInChatError}
   * @throws {@link InvalidDocError}
   * @throws {@link InvalidContextMessageError}
   * @throws {@link UnauthorizedError}
   * @throws {@link ConnectionError}
   */
  async postDocMessage(
    accessToken: string,
    doc: File,
    chatId: number,
    contextMessageId?: ContextMessageId,
  ): Promise<void> {
    await postMediaMessage(this.protocol, this.apiUrl, accessToken, 'doc', doc, chatId, contextMessageId);
  }

  /**
   * Check if all systems are operational. For example, a backend developer building atop Omni Chat can program the
   * server to automatically restart when it becomes "unhealthy".
   * @returns Whether the backend is "healthy".
   */
  async getHealthCheck(): Promise<boolean> {
    const response = await fetch(`${this.protocol}://${this.apiUrl}/health-check`);
    return response.status === 204;
  }
}
