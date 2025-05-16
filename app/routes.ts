import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  index('./pages/home.tsx'),
  layout('./pages/notes/notes.tsx', [
    ...prefix('notes', [
      index('./pages/notes/random-note.tsx'),
      route('new', './pages/notes/new.tsx'),
      route(':noteId', './pages/notes/detail.tsx'),
      route(':noteId/destroy', './pages/notes/destroy.tsx'),
    ]),
  ]),
  route('notes.rss', './pages/rss.tsx'),
] satisfies RouteConfig;
