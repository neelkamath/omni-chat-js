# Omni Chat JS

[![npm (scoped)](https://img.shields.io/npm/v/@neelkamath/omni-chat)](https://www.npmjs.com/package/@neelkamath/omni-chat)

This is the official ES6 (e.g., JavaScript, TypeScript) library for browsers which wraps
the [Omni Chat API](https://github.com/neelkamath/omni-chat-backend). It comes bundled with TypeScript definitions.

## Installation

This table shows which version of this library supports which version of the API:

| Omni Chat JS  | Omni Chat Backend |
| :-----------: | :---------------: |
| 0.5.0 onwards |      0.16.0       |
| 0.1.0 - 0.4.0 |      0.15.0       |

```
npm i @neelkamath/omni-chat
```

## Usage

- Here's the latest version's [documentation](https://neelkamath.github.io/omni-chat-js/). To view a previous version's documentation, find the relevant [release](https://github.com/neelkamath/omni-chat-js/releases), download **docs.zip** from **Assets**, unzip it, and open `docs/index.html` in your browser.
- [Changelog](CHANGELOG.md)
- Never import APIs from nested files.

  For example, this is correct:

  ```typescript
  import { restApi } from '@neelkamath/omni-chat';
  ```

  For example, this is incorrect:

  ```typescript
  import { getMediaMessage } from '@neelkamath/omni-chat/dist/restApi/operator';
  ```

## [Contributing](CONTRIBUTING.md)

## License

This project is under the [MIT License](LICENSE).
