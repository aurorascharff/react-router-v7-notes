import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  layout('./routes/notes/notes.tsx', [...prefix('notes', [])]),
  route('notes.rss', './routes/rss.tsx'),
] satisfies RouteConfig;
