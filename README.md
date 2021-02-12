# Omni Chat JS

[![npm (scoped)](https://img.shields.io/npm/v/@neelkamath/omni-chat)](https://www.npmjs.com/package/@neelkamath/omni-chat)

This is an ES6 (e.g., JavaScript, TypeScript) library for browsers which wraps
the [Omni Chat API](https://github.com/neelkamath/omni-chat-backend). It comes bundled with TypeScript definitions.

## Installation

`npm i @neelkamath/omni-chat`

## Usage

- [Documentation](https://neelkamath.github.io/omni-chat-js/)
- [Changelog](CHANGELOG.md)
- Never import APIs from nested files.

    For example, this is correct:

    ```typescript
    import {restApi} from '@neelkamath/omni-chat';
    ```

    For example, this is incorrect:

    ```typescript
    import {getMediaMessage} from '@neelkamath/omni-chat/dist/restApi/operator';
    ```

## [Contributing](CONTRIBUTING.md)

## License

This project is under the [MIT License](LICENSE).
