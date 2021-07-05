export type PicType = 'ORIGINAL' | 'THUMBNAIL';

/** A PNG or JPEG image not exceeding 3 MiB. */
export type Pic = Blob;

/**
 * The user might want to give their message a context, such as when replying to a message sent several messages ago. In
 * this case, this is the ID of the message being replied to.
 */
export type ContextMessageId = number;

/** An MP3/MP4 audio not exceeding 3 MiB. */
export type Audio = Blob;

/** An MP4 video not exceeding 3 MiB. */
export type Video = Blob;

/** A doc not exceeding 3 MiB. */
export type Doc = Blob;
