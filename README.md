# Noteworthy App with React Router v7

A sleek and modern notes application built with React Router v7, featuring pending UI, Zod for schema validation, and Tailwind CSS.

- 📖 [React Router v7 docs](https://reactrouter.com/dev/start/framework/installation)

## Features

- 📝 Create, read, update, and delete notes
- ⭐ Favorite important notes for quick access
- 🎨 Clean, modern UI with a blue and teal color scheme
- 🔄 Optimistic UI updates with pending indicators
- 📱 Responsive design that works on all devices
- 🛡️ Form validation with Zod
- 🔌 SQLite database for easy local development

## Development

Run the dev server:

```shellscript
npm run dev
```

## Prisma Setup

Add a `.env` file to the root of the project, refer to `.env.sample` for the required environment variables.
You need decide between prisma local development with `sqlite` or a real database with for example `sqlserver`. Define it in the `schema.prisma` file.

After switching, delete the `prisma/migrations` folder before running the migration command.

When using sqlserver, you need to migrate the database schema with:

```bash
npm run prisma.migrate
```

When using sqlite, initialize with:

```bash
npm run prisma.push
```

Seed prisma/seed.ts for initial data:

```sh
npm run prisma.seed
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
