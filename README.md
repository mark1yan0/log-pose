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

- [x] remove places related code for now
- [x] handle modal with values for colors ecc for a country
- [x] refactor layout. remove header and non needed routes
- [ ] remove unused components
- [x] add print feature
- [ ] settings page as modal
  - [x] export/inport
    - [ ] cancel option
  - [ ] ui theme configurator
- [ ] solve ts errors
- [ ] review and standardize all toast messages
- [ ] solve navigation selected for settings
- [x] define default styling
- [ ] use can add infomration such as date visited and how many times
- [x] get bg pattern
- [ ] error handling
- [ ] customize country
  - [ ] colors
  - [ ] labels
- [ ] deploy
- [ ] handle responsive
