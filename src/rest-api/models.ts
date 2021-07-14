export interface MediaFile {
  readonly filename: string;
  readonly blob: Blob;
}

export interface ImageFile {
  readonly filename: string;
  /** A PNG or JPEG image not exceeding 3 MiB. */
  readonly blob: Blob;
}

export interface AudioFile {
  readonly filename: string;
  /** An MP3/MP4 audio not exceeding 3 MiB. */
  readonly blob: Blob;
}

export interface VideoFile {
  readonly filename: string;
  /** An MP4 video not exceeding 3 MiB. */
  readonly blob: Blob;
}

export interface DocFile {
  readonly filename: string;
  /** A doc not exceeding 3 MiB. */
  readonly blob: Blob;
}

export type ImageType = 'ORIGINAL' | 'THUMBNAIL';

/**
 * The user might want to give their message a context, such as when replying to a message sent several messages ago. In
 * this case, this is the ID of the message being replied to.
 */
export type ContextMessageId = number;
