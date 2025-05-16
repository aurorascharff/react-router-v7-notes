import { Form } from 'react-router';
import Favorite from './Favorite';
import Button from './ui/Button';
import Card from './ui/Card';
import type { Note } from '@prisma/client';

export default function NoteDisplay({
  note,
}: {
  note: Pick<Note, 'content' | 'title' | 'favorite'>;
  canDelete?: boolean;
}) {
  return (
    <Card>
      <div className="flex w-fit flex-row items-center gap-2 text-nowrap">
        <h2 className="text-2xl">{note.title}</h2>
        <Favorite note={note} />
      </div>
      <p>{note.content}</p>
      <Form action="destroy" method="post" className="mt-4">
        <Button theme="error" name="intent" type="submit" value="delete">
          Delete
        </Button>
      </Form>
    </Card>
  );
}
