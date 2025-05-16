import { useFetcher } from 'react-router';
import type { Note } from '@prisma/client';

type Props = {
  note: Pick<Note, 'content' | 'title' | 'favorite'>;
  disabled?: boolean;
};

export default function Favorite({ disabled, note }: Props) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData ? fetcher.formData.get('favorite') === 'true' : note.favorite;

  return (
    <fetcher.Form method="post">
      <button
        className="cursor-pointer text-2xl text-yellow-400"
        disabled={disabled}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
