import { Form } from 'react-router';
import type { Note } from '@prisma/client';

type Props = {
  note: Pick<Note, 'content' | 'title' | 'favorite'>;
  disabled?: boolean;
};

export default function Favorite({ disabled, note }: Props) {
  return (
    <Form method="post">
      <button
        className="cursor-pointer text-2xl text-yellow-400"
        disabled={disabled}
        aria-label={note.favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={note.favorite ? 'false' : 'true'}
      >
        {note.favorite ? '★' : '☆'}
      </button>
    </Form>
  );
}
