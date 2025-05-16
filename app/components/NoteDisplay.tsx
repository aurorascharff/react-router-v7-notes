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
      <div className="flex w-fit flex-row items-center gap-2 text-nowrap">
        <h2 className="text-2xl">{note.title}</h2>
        <Favorite note={note} />
      </div>
      <p>{note.content}</p>
      <Form action="destroy" method="post" className="mt-4">
        <Button disabled={!canMutate} theme="error" name="intent" type="submit" value="delete">
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Form>
    </Card>
  );
}
