import { Form, useNavigation } from 'react-router';
import Favorite from './Favorite';
import Button from './ui/Button';
import Card from './ui/Card';
import type { Note } from '@prisma/client';

export default function NoteDisplay({
  note,
  canDelete = true,
}: {
  note: Pick<Note, 'content' | 'title' | 'favorite'>;
  canDelete?: boolean;
}) {
  const navigation = useNavigation();
  const isDeleting = navigation.formData?.get('intent') === 'delete';
  const canMutate = canDelete && !isDeleting;

  return (
    <Card>
      <div className="flex flex-row gap-2 items-center w-fit text-nowrap">
        <h2 className="font-semibold">{note.title}</h2>
        <Favorite note={note} />
      </div>
      <p>{note.content}</p>
      <Form action="destroy" method="post">
        <Button disabled={!canMutate} theme="error" name="intent" type="submit" value="delete">
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Form>
    </Card>
  );
}
