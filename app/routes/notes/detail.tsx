import { isRouteErrorResponse, useRouteError } from 'react-router';
import type { Route } from '../../routes/notes/+types/detail';
import { prisma } from '~/../db';
import NoteDisplay from '~/components/NoteDisplay';
import ErrorMessage from '~/components/ui/ErrorMessage';
import { slow } from '~/utils/slow';

export function meta({ data }: Route.MetaArgs) {
  const { description, title } = data
    ? {
        description: `${data.note.title} - React Router v7 Notes`,
        title: `${data.note.title}`,
      }
    : { description: 'Note not found', title: 'Not found' };

  return [
    { content: description, name: 'description' },
    { content: description, name: 'twitter:description' },
    { title },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  await slow();

  const note = await prisma.note.findUnique({
    where: { id: Number(params.noteId) },
  });
  if (!note) {
    throw new Response('Note not found.', {
      status: 404,
    });
  }
  return {
    note,
  };
}

export async function action({ params, request }: Route.ActionArgs) {
  await slow();

  const formData = await request.formData();
  return prisma.note.update({
    data: {
      favorite: formData.get('favorite') === 'true',
    },
    where: { id: Number(params.noteId) },
  });
}

export default function NoteDetailRoute({ loaderData }: Route.ComponentProps) {
  const note = loaderData.note;

  return <NoteDisplay note={note} />;
}

export function ErrorBoundary({ params }: Route.ErrorBoundaryProps) {
  const noteId = params.noteId;
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorMessage>Note with ID &quot;{noteId}&quot; not found.</ErrorMessage>;
    }
  }

  return <ErrorMessage>There was an error loading note with ID &quot;${noteId}&quot;. Please try again.</ErrorMessage>;
}
