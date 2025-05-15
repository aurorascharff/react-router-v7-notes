import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import type { Route } from './+types/notes._index';
import { prisma } from '~/../db';
import ErrorMessage from '~/components/ui/ErrorMessage';
import Note from '~/components/ui/Note';

export const loader = async () => {
  const count = await prisma.note.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomNote] = await prisma.note.findMany({
    skip: randomRowNumber,
    take: 1,
  });
  if (!randomNote) {
    throw new Response('No random note found', {
      status: 404,
    });
  }
  return { randomNote };
};

export default function NotesIndexRoute({ loaderData }: Route.ComponentProps) {
  return (
    <Note>
      <h2 className="text-xl font-semibold">Don&apos;t forget!</h2>
      <p>{loaderData.randomNote.content}</p>
      <Link to={loaderData.randomNote.id}>Go to &quot;{loaderData.randomNote.title}&quot; details</Link>
    </Note>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <ErrorMessage>
        <p>There are no notes to display.</p>
        <Link to="new">Add your own</Link>
      </ErrorMessage>
    );
  }

  return <ErrorMessage>Something went wrong.</ErrorMessage>;
}
