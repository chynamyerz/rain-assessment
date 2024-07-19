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
- `backend`: a [Express.js](https://expressjs.com/) app server

### Utilities

This monorepo uses the following tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Run

_Make sure to add a `.env` file at the root of the `frontend` folder with the value for `VITE_API_URL`_

_Make sure to add a `.env` file at the root of the `backend` folder with the vale for `JWT_SECRET`_

#### To run all apps, execute the following command:

```
git clone https://github.com/chynamyerz/rain-assessment
cd rain-assessment
npm i
npm run dev
```

#### Otherwise, to run as individual execute the following

- For frontend

```
git clone https://github.com/chynamyerz/rain-assessment
cd rain-assessment
npm i
npm run frontend
```

- For backend

```
git clone https://github.com/chynamyerz/rain-assessment
cd rain-assessment
npm i
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
