# Show the structure of the project

-   apps directory which contains multiple apps
-   packages directory which contains any shared packages

Explain the hierarchy quickly (using the graph command)

# pnpm

Used instead of `npm` or `yarn` as our package manager. It has some benefits over the other 2 alternatives:

-   generally faster
-   eliminates duplicate dependencies
-   can operate across multiple packages

It's configured with a `pnpm-workspace.yaml` file. Run an install and show the contents of `node_modules`.

-   Demonstrate a `pnpm` filter command. Mention you probably won't need to use it though.

# Configuration structure

The use of a monorepo allows us to share various bits of configuration, while also allowing us to override within local packages if neccessary.

-   Show the root tsconfig.json
-   Show an override

Similar is available for eslint rules as-well. It's interesting at this point to look at what this means for TypeScript however.

-   CODEOWNERS.md

Used to define which team own different areas of the repository. The work on splitting domains will be important in deciding what the actual package structure will look like. The ideal we want to work towards is that

# TypeScript

Each package is configured to produce a build into it's own `dist` directory. This means we need to change a few things around in the `package.json` to ensure that the entry point is targetted at the build output.

What this means, is that we don't build an application as a whole. Instead we build package by package and include them just like we would a package from npm. What this means is we can scope changes, and therefore reduce the amount of work the various tools need to do. So instead the following can be scoped to a single package and therefore far fewer files:

-   builds (tsc compiler)
-   linting
-   tests

# Turborepo

When introducing multiple packages this brings about a new problem of orchestrating the builds. Packages need to be built in the correct order for things to work correctly. Additionally depending on which package you're working on, much of the dependency graph may be un-affected. Turborepo helps manage this with intelligent caching.

-   demo build
-   demo 2nd build
-   demo testing
-   demo build watch while developing
-   demo running apps
-   demo individual package commands
