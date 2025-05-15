import { Form, isRouteErrorResponse, useRouteError } from 'react-router';
import type { Route } from './+types/notes.$noteId';
import { prisma } from '~/../db';
import Favorite from '~/components/Favorite';
import Button from '~/components/ui/Button';
import ErrorMessage from '~/components/ui/ErrorMessage';
import Note from '~/components/ui/Note';
import { slow } from '~/utils/slow';

export const meta = ({ data }: Route.MetaArgs) => {
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
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  await slow();

  const note = await prisma.note.findUnique({
    where: { id: params.noteId },
  });
  if (!note) {
    throw new Response('Note not found.', {
      status: 404,
    });
  }
  return {
    note,
  };
};

export const action = async ({ params, request }: Route.ActionArgs) => {
  await slow();

  const formData = await request.formData();
  return prisma.note.update({
    data: {
      favorite: formData.get('favorite') === 'true',
    },
    where: { id: params.noteId },
  });
};

export default function NoteRoute({ loaderData }: Route.ComponentProps) {
  const note = loaderData.note;

  return (
    <Note>
      <div className="flex flex-row gap-2 items-center w-fit text-nowrap">
        <h2 className="font-semibold">{note.title}</h2>
        <Favorite note={note} />
      </div>
      <p>{note.content}</p>
      <Form action="destroy" method="post">
        <Button className="bg-error" name="intent" type="submit" value="delete">
          Delete
        </Button>
      </Form>
    </Note>
  );
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
