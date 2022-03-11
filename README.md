# Intro

This repository is setup in a monorepo structure and introduces some new build tools. Notable [pnpm](https://pnpm.io/) as the package manager and [Turborepo](https://turborepo.org/) as a build tool. The repository splits the structure into the following:

- **apps** - This is where end user web applications live
- **packages** - This is where anything reusable lives such as component libraries, utility libraries

> Getting Started: You'll need to ensure you install the key tools that we're using before you can use this repository. Here are links to the installation guides:
> pnpm - https://pnpm.io/installation
> Turborepo - https://turborepo.org/docs/getting-started#install-turbo

# Working within this Repository

We'll detail some of the things you may need to know here when developing against this repository.

## Running this project

Running the repository is fairly straight forward, although we're going to use `pnpm` instead of npm or yarn. Therefore once you have cloned the repository, navigate to the root project directory and run:

```
pnpm install
pnpm start
```

This will install the dependencies, and start the web applications, automatically triggering any dependent builds in the process.

## Useful Scripts

There are a number of useful scripts provided at the root of the project. The aim is that you should rarely need to navigate to a sub-package to run a particular script. There is also a naming convention to make this easier to remember:

- `test`, `build`, `lint`, `cypress` (Run against all packages)
- `testp`, `buildp`, `lintp`, `cypressp`, `storybookp` (Run against a single package - **p** suffix)
- `testw`, `dev`, `cypressw`, `storybookw` (Run against a single in watch-mode - **w** suffix)

Other useful scripts:

- `clean` - Remove node_modules, build output and Turborepo caches
- `refresh` - Same as clean, except automatically install all dependencies again afterwards
- `graph` - Generate a dependency graph for the build command and display in a browser

If you need to manually run a script against a single package you can still do this using `pnpm` by doing:

```
pnpm run <script-name> --filter <package|app>
```

## Installing a package as a dependancy

To add a package as a dependency within `pnpm`. Simply run `pnpm add @iw/title` for example to add the title package.

```
cd apps/MyApp
pnpm add MyLibrary
```

## Adding a Package

Adding a new package varies slightly depending on the type of package that you want to add.

### Adding a React Application

Adding a react component library can be done using `create-react-app` although this needs to be done slightly differently due to the fact we're using both `pnpm` and a monorepo.

> Use the script featured below, replacing `<MyLibrary>` with the name of your component library

```
cd apps
pnpx create-react-app <MyApp> --template typescript
rm -rf <MyApp>/node_modules
rm <MyApp>/package-lock.json
cd ..
pnpm install
```

The above, basically switches us over to use `pnpm` instead of the default `npm` package manager by removing the extra bits that the CRA script added in.

Once you've done this you should then additional configure the following to work correctly in the monorepo:

- [TypeScript Config]()
- [ESLint Config]()
- [Package Scripts]()

#### (Optional) Craco

If you require craco support to configure your react application then you can install it post creation:

```
cd apps/<MyApp>
pnpm add --save-dev @craco/craco
```

You will then need to replace all the scripts in `package.json` to read `craco <operation>` instead of `react-scripts <operation>`. Finally you'll want to add a `craco.config.js` with your overrides.

### Adding a React Component Library

Adding a react component library can be done using `create-react-app` although needs to be done slightly differently due to the fact we're using both `pnpm` and a monorepo.

> Use the script featured below, replacing `<MyLibrary>` with the name of your component library

```
cd packages
pnpx create-react-app <MyLibrary> --template typescript
rm -rf <MyLibrary>/node_modules
rm <MyLibrary>/package-lock.json
cd ..
pnpm install
```

The above, basically switches us over to use `pnpm` instead of the default `npm` package manager by removing the extra bits that the CRA script added in.

Once you've done this you should then additional configure the following to work correctly in the monorepo:

- [TypeScript Config]()
- [ESLint Config]()
- [Package Scripts]()

#### Removing Boilerplate

If you don't want a test page where you render your library (for example a View - which may later lend itself to a micro-frontend) then you can prevent your library from being like an application. To do this:

```
cd packages/<MyLibrary>
rm -rf public
rm src/App*
rm src/logo.svg
rm src/react-app-env.d.ts
rm src/reportWebVitals.ts
rm src/setupTests.ts
```

#### Setup the Build

To properly leverage a monorepo structure we want tools to run in a targetted fashion. This means that we lint, test & build at the package level. Therefore we need to setup a build process for our library. Assuming you've already setup your `tsconfig.json` correctly you should just need to configure a few fields in the `package.json` file to tell other packages where the code & types are. Additionally we can specify which files to publish if we think this package will end up living in a package repository such as `npm`. Add the following to your `package.json` file:

```
"main": "./dist/src/index.js",
"types": "./dist/src/index.d.ts",
"files": [
    "/dist"
],
"scripts": {
   "build": "tsc"
}
```

> Note that the `main` value needs to be referrencing the compiled `.js` file rather than a `.ts` file

### Adding a TypeScript Library

Adding a TypeScript library is very similar to creating a React Component Library, but instead we manually configure the project ourselves. Firstly you'll want to create a new directory for your package and an associated `package.json` file.

```
mkdir packages/MyTypeScriptLibrary
cd packages/MyTypeScriptLibrary
pnpm init
pmnpm install --save-dev typescript
```

Once you've done this you should then additional configure the following to work correctly in the monorepo:

- [TypeScript Config]()
- [ESLint Config]()
- [Package Scripts]()

#### Setup the Build

To properly leverage a monorepo structure we want tools to run in a targetted fashion. This means that we lint, test & build at the package level. Therefore we need to setup a build process for our library. Assuming you've already setup your `tsconfig.json` correctly you should just need to configure a few fields in the `package.json` file to tell other packages where the code & types are. Additionally we can specify which files to publish if we think this package will end up living in a package repository such as `npm`. Add the following to your `package.json` file:

```
"main": "./dist/src/index.js",
"types": "./dist/src/index.d.ts",
"files": [
    "/dist"
],
"scripts": {
   "build": "tsc"
}
```

> Note that the `main` value needs to be referrencing the compiled `.js` file rather than a `.ts` file

#### Adding Tests

When creating your own library you need to setup the unit test runner yourself. You'll need to install jest manually:

```
pnpm add --save-dev jest @types/jest
```

Once you've done this you should add a `test` script. The recommendation is to use `jest --passWithNoTests`

### Common

#### TypeScript Configuration

To support TypeScript a `tsconfig.json` file will have been created if you used `create-react-app` or you'll need to create one manually if creating a TypeScript library. We recommend replacing this with one that inherits from the project level configuration, and then overriding any values that need changing. An example would be:

```
{
  "extends": "../../tsconfig",
  "compilerOptions": {
    "outDir": "./dist",
    "noEmit": true,         // just for create-react-app projects
    "module": "esnext"
  },
  "include": ["src"]
}
```

#### Eslint Configuration

To configure eslint the first thing you need to do is remove any `eslintConfig` section from your `package.json` file and instead add a `lint` script. Once you've done this you may then optionally add an `.eslintrc.js` to customise eslint. By importing from the base we can share a common eslint while allowing slightly different configurations for each different package/app.

> If you don't want to completely overwrite the configuration from the shared config, ensure that you use a spread syntax.

Here is an example for a react component library.

```
const base = require("../../.eslintrc");

module.exports = {
  ...base,
  extends: [...(base.extends ?? []), "react-app", "react-app/jest"],
  overrides: [
    ...(base.overrides ?? {}),
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
```

Finally add a new script to the `package.json` file:

```
"lint": "eslint ."
```

#### Package Scripts

There are a number of scripts that should exist within your `package.json` file by default. These are as follows, with an example provided:

| Script          | Example                                               | Description                                                                                               |
| --------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| build\*         | `tsc`                                                 | Compiles the package/application into an appropriate output directory                                     |
| dev\*           | `tsc -w`                                              | Watches the file system and rebuilds anytime a change is made. This is used when developing/hot-reloading |
| lint\*          | `eslint .`                                            | Run a linter against the package                                                                          |
| test\*          | `react-scripts test` \| `jest`                        | Runs the unit tests against the package                                                                   |
| clean\*         | `rm -rf .turbo && rm -rf node_modules && rm -rf dist` | Removes node_modules, build output and any caches produced by Turborepo                                   |
| storybook       | `start-storybook -p 6006`                             | **(Optional)** Starts Storybook for the package                                                           |
| build-storybook | `build-storybook`                                     | **(Optional)** Builds Storybook for the package                                                           |
| cypress         | `./node_modules/.bin/cypress run`                     | **(Optional)** Runs Cypress for the package                                                               |

#### Adding Storybook

Storybook can be added to your project in the usual way by running `pnpx sb init` from the package that you wish to add it to, however there are a couple of caveats for when using a pnpm monorepo.

Firstly you must make sure there are no imports from other packages in the workspace within your `package.json` file for which you wish to add storybook to. This is because storybook is unable to parse the syntax and will instead provide the following error:

> Unsupported URL Type "workspace:": workspace:1.0.0

First briefly remove any dependencies such as these from the `package.json` file, then run the following:

```
pnpx sb init
rm -rf node_modules
rm package-lock.json
cd ../../
pnpm install
```

At this point you can re-instate any of those dependencies. The next thing you must do is modify the [addons slightly](https://github.com/storybookjs/storybook/issues/13428#issuecomment-754169198). To do this open up the `.storybook/main.js` file and swap the following addon `"@storybook/preset-create-react-app"` to be :

```
{
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: 'react-scripts'
      }
    }
```

You should now be able to run Storybook from the root of your application using the `pnpm storybookw` command.

> Note: The `storybookp` command builds storybook for the package, rather than launching and running in watch mode.
