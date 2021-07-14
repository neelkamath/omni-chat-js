# Contributing

## Forking

If you're forking the repo to develop the project as your own instead of just to send back a PR, follow these instructions.

1. Create a [GitHub secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Set the **Name** to `NPM_TOKEN`. Set the **Value** to an [NPM _Automation_ token](https://docs.npmjs.com/creating-and-viewing-access-tokens).
1. Configure the [publishing source](https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for the documentation's site to use the `gh-pages` branch.

## Installation

1. Install [Node.js 14](https://nodejs.org/en/download/).
1. Clone the repository using one of the following methods:
   - SSH: `git clone git@github.com:neelkamath/omni-chat-js.git`
   - HTTPS: `git clone https://github.com/neelkamath/omni-chat-js.git`
1. `cd omni-chat-js`
1. `npm i`

## Developing

- Test: `npm t`
- Check for lint issues: `npm run lint`
- Check for, and fix lint issues: `npm run fix`
- Generate docs to `docs/`:
  - Development (watches for changes): `npm run doc:watch`
  - Production: `npm run doc:build`

### Conventions

- Each directory's tests must be placed in a subdirectory named `__tests__`, and the test files named using the format `<FILENAME>.test.ts` where `<FILENAME>` is the name of file getting tested. For example, the tests for [`graphql-api/scalars.ts`](src/graphql-api/scalars.ts) are in [`graphql-api/__tests__/scalars.test.ts`](src/graphql-api/__tests__/scalars.test.ts).
- Group each function's test cases in a `describe()` block. See [`scalars.test.ts`](src/graphql-api/__tests__/scalars.test.ts) for an example.
- Every directory must contain an `index.ts` file which exports public APIs in order to make it easier to (re-)export.
- Name TypeScript files having a main export the same as the export (e.g., [`createAccount.ts`](src/graphql-api/mutations/createAccount.ts)). Name other TypeScript files using _camelCase_.
- Name directories and non-TypeScript files using _kebab-case_.

### Releasing a New Version

1. Bump the version in [`package.json`](package.json).
1. Add a [Changelog](CHANGELOG.md) entry.
1. Update the [README's version matrix](README.md#installation).
1. Commit to the `main` branch. The CI/CD pipeline will take care of the rest.
