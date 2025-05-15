import { useFetcher } from 'react-router';

type NoteFields = {
  content: string;
  title: string;
  favorite: boolean;
};

export default function Favorite({ note }: { note: NoteFields }) {
  const fetcher = useFetcher();
  const favorite = note.favorite;

  return (
    <fetcher.Form method="post">
      <button
        className="text-teal"
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        name="favorite"
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
