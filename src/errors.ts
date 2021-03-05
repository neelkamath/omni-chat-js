/**
 * Occurs when an operation requiring an access token was either not passed a
 * token or was passed an invalid one.
 */
export class UnauthorizedError extends Error {
}

/**
 * This error is thrown when the server is unreachable. For example, the server
 * may have crashed due to a server-side bug, the client sent the server a
 * malformed request, or the client's internet connection is down.
 */
export class ConnectionError extends Error {
}

/** Either the frontend sent a malformed request or the backend has a bug. */
export class InternalServerError extends Error {
}
