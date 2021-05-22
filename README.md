# Omni Chat JS

[![npm (scoped)](https://img.shields.io/npm/v/@neelkamath/omni-chat)](https://www.npmjs.com/package/@neelkamath/omni-chat)

Official [Omni Chat API](https://github.com/neelkamath/omni-chat-backend) JavaScript wrapper library.

- Platforms: Browsers supporting ES6 or higher
- Module systems: ECMAScript Modules
- Programming languages: ES6 (JavaScript, TypeScript, etc. which target ES6 or higher)
- Static types: TypeScript definitions bundled

## Installation

This table shows which versions of Omni Chat JS support which versions of Omni Chat Backend:

|   Omni Chat JS   | Omni Chat Backend |
| :--------------: | :---------------: |
| 0.12.0 or higher |      0.19.0       |
| 0.11.0 |      0.18.0       |
|  0.8.0 - 0.10.0  |      0.17.0       |
|  0.5.0 - 0.7.0   |      0.16.0       |
|  0.1.0 - 0.4.0   |      0.15.0       |

```
npm i @neelkamath/omni-chat
```

## Usage

- Here's the latest version's [documentation](https://neelkamath.github.io/omni-chat-js/). To view a previous version's documentation, find the relevant [release](https://github.com/neelkamath/omni-chat-js/releases), download **docs.zip** from **Assets**, unzip it, and open `docs/index.html` in your browser.
- [Changelog](CHANGELOG.md)
- Never import APIs from nested files.

  For example, this is correct:

  ```typescript
  import { RestApi } from '@neelkamath/omni-chat';
  ```

  For example, this is incorrect:

  ```typescript
  import { getMediaMessage } from '@neelkamath/omni-chat/dist/restApi/operator';
  ```

## [Contributing](CONTRIBUTING.md)

## License

This project is under the [MIT License](LICENSE).
