# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# TODO

- [ ] remove places related code for now
- [x] handle modal with values for colors ecc for a country
- [x] refactor layout. remove header and non needed routes
- [ ] remove unused components
- [ ] add print feature
- [ ] settings page
  - [x] export/inport
    - [ ] cancel option
  - [ ] ui
- [ ] solve ts errors
- [ ] review and standardize all toeast messages
- [ ] solve navigation selected for settings
- [ ] define default styling
- [ ] can only update colors for now
- [ ] use can add infomration such as date visited and how many times
- [ ] get bg pattern
