import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTES = [
  {
    content: 'CSS Grid is perfect for two-dimensional layouts, while Flexbox works best for one-dimensional layouts.',
    title: 'CSS Layout',
  },
  {
    content: 'Always handle Promise rejections with try/catch or .catch() to avoid unhandled promise rejections.',
    title: 'Promise Handling',
  },
  {
    content: 'Setting up proper ESLint and Prettier configurations can save hours of debugging and code reviews.',
    title: 'Code Quality',
  },
  {
    content: 'React Context API is useful for passing data through the component tree without props drilling.',
    title: 'React Context',
  },
  {
    content: 'Low-level optimizations are rarely the bottleneck. Focus on algorithms and data structures first.',
    title: 'Performance Tips',
  },
  {
    content: 'Well-written code comments explain why something is done, not what is being done.',
    title: 'Documentation',
  },
  {
    content: 'Component composition is often better than inheritance for reusing code in React applications.',
    title: 'React Patterns',
  },
  {
    content: 'Database indexing is crucial for query performance but can slow down write operations.',
    title: 'Database Design',
  },
  {
    content: 'React Router v7 code-based routing provides more control and type safety compared to file-based routing.',
    favorite: true,
    title: 'React Router v7',
  },
  {
    content: 'Use React memo, useCallback and useMemo to optimize render performance for complex components.',
    title: 'React Optimization',
  },
  {
    content: 'Tailwind CSS utility-first approach can significantly speed up UI development and ensure consistency.',
    title: 'CSS Frameworks',
  },
  {
    content: 'Use Suspense and lazy loading in React to split your bundle and improve initial load performance.',
    title: 'Code Splitting',
  },
  {
    content: 'Server Components in React reduce client-side JavaScript and enable efficient data fetching patterns.',
    title: 'React Server Components',
  },
  {
    // eslint-disable-next-line quotes
    content: "Consider using Zod for runtime type validation to complement TypeScript's static type checking.",
    favorite: true,
    title: 'Data Validation',
  },
  {
    content: 'Use environment variables for configuration but never commit sensitive values to your repository.',
    title: 'Security Best Practices',
  },
  {
    content:
      'Web Workers enable running JavaScript in background threads for improved performance in computation-heavy tasks.',
    title: 'Browser Performance',
  },
];

function seedNotes() {
  Promise.all(
    NOTES.map(n => {
      return prisma.note.create({ data: { content: n.content, favorite: n.favorite || false, title: n.title } });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully created note records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create note records', e);
    });
}

seedNotes();
