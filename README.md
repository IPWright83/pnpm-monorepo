# Creating the Project
I started off by creating an empty project and then proceeding to create a new React Application

```
pnpm init 
<create pnpm-workspace.yaml>
mkdir packages
cd packages
pnpx create-react-app app --template typescript
rm -rf app/node_modules 
rm package-lock.json
cd ..
pnpm install
```

The `pnpm-workspace.yaml` file looks like this and configures the packages that are known about to pnpm.
```
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
  - '!**/__tests__/**'
```

It is worth noting that `create-react-app` doesn't allow for `pnpm` to be used as a package manager. This is why we need to manually remove `node_modules` and re-install from the root.

This creates a React application that can be ran from the root by using `pnpm start --filter app`

## Adding craco support

We want to add craco support to our project, to achieve this I did:

```
cd packages/app
pnpm i @craco/craco --save-dev
```

Then I followed the rest of the steps from here https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation

## Adding a component package

To add a React library package I'm currently doing the following:

```
cd packages
pnpx create-react-app MyLibrary --template typescript
rm -rf MyLibrary/node_modules 
rm MyLibrary/package-lock.json
cd ..
pnpm install
```

To add as a depdency to the `app` project simply:

> Note: Before doing this I modified the name of the package to be @MyNamespace/MyLibrary and added a `main` attribute to be `"main": "./src/index.ts"`

```
cd packages/app
pnpm install MyLibrary
```

You will also need to update the `craco.config.js` file to include the new library you've added:

`packages.push(path.join(__dirname, '../title'));`

> Note: It's useful updating the `tsconfig.json` to inherit from the root at this point:
> ```
> {
>  "extends": "../../tsconfig",
>  "compilerOptions": {
>    "outDir": "./dist",
>    "noEmit": true,
>    "module": "esnext"
>  },
>  "include": [
>    "src"
>  ],
>  "exclude": [
>    "node_modules",
>    "dist"
>  ]
> }
> ```

## Adding Storybook

Storybook doesn't fully understand pnpm yet, and as a result we need a few tweaks when initialising. So essentially you need to ensure that there are no "linked" workspaces before you start as Storybook doesn't understand these. As an example the following dependency `"@iw/log": "workspace:^0.1.0",` will cause errors, as it's unable to understand the "workspace" protocol.

If you remove all these just for setup, then run `pnpx sb init`, you can then re-instate these dependencies after initialisation.

### TypeScript support

We normally use TypeScript when developing, however Storybook doesn't like the TypeScript template in CRA (Create-React-App). There is a workaround https://github.com/storybookjs/storybook/issues/13428 which involves changing the `.storybook/main.js` created. Swap:

```
"addons": [
    ...
    "@storybook/preset-create-react-app"
  ]
```

to

```
"addons": [
    ...
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: 'react-scripts'
      }
    }
]
```
