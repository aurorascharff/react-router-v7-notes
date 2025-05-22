import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
    index('./routes/home.tsx'),
    route('notes.rss', './routes/rss.tsx')] satisfies RouteConfig;