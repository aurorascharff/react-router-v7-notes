import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NOTES = [
  {
    content: 'Remember to review React hooks documentation for the upcoming project.',
    title: 'React Hooks',
  },
  {
    content: 'TypeScript configuration for Next.js projects requires special attention to module resolution.',
    favorite: true,
    title: 'TypeScript Config',
  },
  {
    content: 'When working with Docker, remember to optimize your Dockerfile to reduce image size.',
    title: 'Docker Tips',
  },
  {
    content: 'CSS Grid is perfect for two-dimensional layouts, while Flexbox works best for one-dimensional layouts.',
    title: 'CSS Layout',
  },
  {
    content: 'For responsive designs, use relative units like rem and em rather than fixed pixel values.',
    title: 'Responsive Design',
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
    content: 'Remember to set appropriate cache headers for static assets to improve performance.',
    title: 'Web Performance',
  },
  {
    content: 'Test-driven development (TDD) can lead to more maintainable code and fewer bugs in production.',
    title: 'Testing Practices',
  },
  {
    content: 'Java 17 introduced pattern matching for switch statements, making code more concise and readable.',
    title: 'Java Features',
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
    content: 'Use CSS variables (custom properties) for theme implementation and dynamic styling.',
    title: 'CSS Variables',
  },
  {
    content: 'HTTP/3 uses QUIC protocol which improves performance over unreliable connections.',
    title: 'Web Protocols',
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
    content: 'GraphQL allows clients to request exactly the data they need, reducing over-fetching and under-fetching.',
    title: 'GraphQL Benefits',
  },
  {
    content:
      'TypeScript Discriminated Unions make handling different states in your application more type-safe and robust.',
    title: 'TypeScript Patterns',
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
    content: 'Consider using Zod for runtime type validation to complement TypeScript&apos;s static type checking.',
    favorite: true,
    title: 'Data Validation',
  },
  {
    content: 'Docker Compose simplifies managing multi-container applications for development and testing.',
    title: 'Container Orchestration',
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
