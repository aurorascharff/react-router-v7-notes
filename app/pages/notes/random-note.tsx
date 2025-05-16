import { href, isRouteErrorResponse, Link, useRouteError } from 'react-router';
import type { Route } from './+types';
import { prisma } from '~/../db';
import Card from '~/components/ui/Card';
import ErrorMessage from '~/components/ui/ErrorMessage';

export async function loader() {
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
}

export default function RandomNote({ loaderData }: Route.ComponentProps) {
  return (
    <Card>
      <p>{loaderData.randomNote.content}</p>
      <Link to={href('/notes/:noteId', { noteId: loaderData.randomNote.id })}>
        Go to &quot;{loaderData.randomNote.title}&quot; details
      </Link>
    </Card>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <ErrorMessage>
        <p>There are no notes to display.</p>
        <Link to={href('/notes/new')}>Add your own</Link>
      </ErrorMessage>
    );
  }

  return <ErrorMessage>Something went wrong.</ErrorMessage>;
}
