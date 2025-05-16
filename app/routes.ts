import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  index('./pages/home/home.tsx'),
  layout('./pages/notes/layout.tsx', [
    ...prefix('notes', [
      index('./pages/notes/index.tsx'),
      route('new', './pages/notes/new.tsx'),
      route(':noteId', './pages/notes/detail.tsx'),
      route(':noteId/destroy', './pages/notes/destroy.tsx'),
    ]),
  ]),
  route('notes.rss', './pages/feed.tsx'),
] satisfies RouteConfig;
