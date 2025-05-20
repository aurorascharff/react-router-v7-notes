import { href, redirect } from 'react-router';
import type { Route } from './+types/destroy';
import { prisma } from '~/../db';

export async function action({ params, request }: Route.ActionArgs) {
  const form = await request.formData();
  if (form.get('intent') !== 'delete') {
    throw new Response(`The intent ${form.get('intent')} is not supported`, {
      status: 400,
    });
  }
  const note = await prisma.note.findUnique({
    where: { id: params.noteId },
  });
  if (!note) {
    throw new Response('Cannot delete a note that does not exist', {
      status: 404,
    });
  }
  await prisma.note.delete({ where: { id: params.noteId } });
  return redirect(href('/notes'));
}
