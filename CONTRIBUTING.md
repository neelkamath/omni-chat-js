# Contributing

## Forking

If you're forking the repo to develop the project as your own instead of just to send back a PR, follow these instructions.

1. Create a [GitHub secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Set the **Name** to `NPM_TOKEN`. Set the **Value** to an [NPM *Automation* token](https://docs.npmjs.com/creating-and-viewing-access-tokens).
1. Configure the [publishing source](https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for the documentation's site to use the `gh-pages` branch.

## Installation

1. Install [node.js 14](https://nodejs.org/en/download/).
1. Clone the repository using one of the following methods:
    - SSH: `git clone git@github.com:neelkamath/omni-chat-js.git`
    - HTTPS: `git clone https://github.com/neelkamath/omni-chat-js.git`
1. `cd omni-chat-js`
1. `npm i`

## Developing

### Testing

```
npm t
```

### Linting

```
npm run fix
```

### Documentation

```
npm run doc
```

Documentation will be generated to `docs/`.

### Conventions

- Group each function's test cases in a `describe()` block. See [`MutationsApi.test.ts`](src/graphql-api/__tests__/MutationsApi.test.ts) for an example.
- Name TypeScript files having a main `export` the same as the `export` (e.g., [`src/graphql-api/MutationsApi.ts`](MutationsApi.ts)). Name other TypeScript files using _camelCase_.
- Name directories and non-TypeScript files using _kebab-case_.
- Don't document [GraphQL fragments](src/graphql-api/fragments.ts); only [GraphQL models](src/graphql-api/models.ts).
- Since the GraphQL [inline fragments](src/graphql-api/fragments.ts) can be nested within each other, arguments to fields may clash. To avoid this, use the format `<FRAGMENT>_<FIELD>_<ARGUMENT>` when naming variables. For example, an argument `last` to a field `messages` in a fragment `ChatMessages` would be named `chatMessages_messages_last`.
- Functions dealing with GraphQL operations which take a JWT must have the token as the first parameter regardless of whether it's optional. This is for the purpose of a consistent public API. Internal APIs such as [`operator.ts`](src/graphql-api/operator.ts) don't follow this.
- Use the `ForwardPagination` and `BackwardPagination` [models](src/graphql-api/pagination.ts) instead of passing `first`, `after`, `last`, and `before` arguments in API call functions.
- Here's how to convert GraphQL syntax to TypeScript syntax to create [GraphQL models](src/graphql-api/models.ts):

    |GraphQL|TypeScript|
    |---|---|
    |`type`, `input`, `interface`|`interface`|
    |`union`, `enum`, `scalar`|`type`|
    |`implements`|`extends`|
- Models must have each of their fields defined when written as a TypeScript `interface` because it makes it easier to compare to the GraphQL schema models. For example, even though the `NewContact` `interface` can omit the fields it's `extend`ing from `AccountData`, it defines them since that's how it appears in the GraphQL schema:

    ```typescript
    export interface AccountData {
        readonly __typename: 'Account' | 'BlockedAccount' | 'NewContact';
        readonly id: number;
        readonly username: Username;
        readonly emailAddress: string;
        readonly firstName: Name;
        readonly lastName: Name;
        readonly bio: Bio;
    }

    export interface NewContact extends AccountData {
        readonly __typename: 'NewContact';
        readonly id: number;
        readonly username: Username;
        readonly emailAddress: string;
        readonly firstName: Name;
        readonly lastName: Name;
        readonly bio: Bio;
    }
    ```

### Releasing a New Version

1. Bump the version in [`package.json`](package.json).
1. Add a [Changelog](CHANGELOG.md) entry.
1. Update the [README's version matrix](README.md#installation) if required.
1. Commit to the `main` branch. The CI/CD pipeline will take care of the rest.
