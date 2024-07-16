# Rain Assessment

This is an assessment for rain technical interview.

This assessment is a monorepo boostrapped with [turbo](https://turbo.build/repo).

To be able to exexute this project, an assumption is made that the following tools are already installed:

- [Node LTS](https://nodejs.org/en)
- [Git](https://git-scm.com/)

## What's inside?

Inside this monorepo you will find the following packages/apps:

### Apps and Packages

- `frontend`: a [React.js](https://react.dev/) app
- `backend`: another [Express.js](https://expressjs.com/) app server
- `@rain/ui`: a stub React component library shared by applications
- `@rain/eslint-config`: `eslint` configurations (includes `eslint-config-prettier`)
- `@rain/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This monorepo uses the following tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Run

To run all apps and packages, execute the following command:

```
cd rain-assessment
npm run dev
```

Otherwise, to run as individual execute the following

- For frontend

```
cd rain-assessment
npm run frontend
```

- For backend

```
cd rain-assessment
npm run backend
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
