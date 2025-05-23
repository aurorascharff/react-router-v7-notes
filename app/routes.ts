import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  layout('./routes/notes/notes.tsx', [
    ...prefix('notes', [
      index('./routes/notes/random-note.tsx'),
      route('new', './routes/notes/new.tsx'),
      route(':noteId', './routes/notes/detail.tsx'),
      route(':noteId/destroy', './routes/notes/destroy.tsx'),
    ]),
  ]),
  route('notes.rss', './routes/rss.tsx'),
] satisfies RouteConfig;
