import { Form, isRouteErrorResponse, Link, useRouteError } from 'react-router';
import type { Route } from './+types/notes.$noteId';
import { prisma } from '~/../db';

import Favorite from '~/components/NoteActions';
import Button from '~/components/ui/Button';
import ErrorMessage from '~/components/ui/ErrorMessage';
import { slow } from '~/utils/slow';

export const meta = ({ data }: Route.MetaArgs) => {
  const { description, title } = data
    ? {
        description: `${data.note.title} - Noteworthy App`,
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
    <div className="flex flex-col gap-y-4">
      <h2 className="text-2xl font-semibold text-teal">{note.title}</h2>
      <p>{note.content}</p>
      <div className="flex flex-row gap-2 text-teal w-fit text-nowrap">
        <Link to=".">Permalink</Link>
        <Favorite note={note} />
      </div>
      <Form action="destroy" method="post">
        <Button name="intent" type="submit" value="delete">
          Delete
        </Button>
      </Form>
    </div>
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
