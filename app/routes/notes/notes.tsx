import { Link, href } from 'react-router';
import type { Note } from '@prisma/client';
import NavButton from '~/components/ui/NavButton';
import { cn } from '~/utils/style';

export function meta() {
  return [{ content: 'React Router v7 Notes', name: 'description' }, { title: 'Notes' }];
}

export default function NotesRoute() {
  const isLoading = false;
  const notes: Note[] = [];

  return (
    <div className="flex w-full flex-col gap-10 bg-gray-100">
      <header className="border-primary border-b bg-white py-4">
        <div className="mx-10 flex max-w-xl items-center justify-between lg:mx-40">
          <h1 className="text-4xl">
            <Link className="text-black hover:no-underline" to="/">
              <span>React Router v7 Notes</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="mx-10 flex grow flex-col gap-10 py-3 md:flex-row lg:mx-40">
        <div className="flex flex-col gap-4">
          <NavButton to={href('/notes/new')}>Create note</NavButton>
          <div className="rounded-sm border border-gray-500 p-4 md:w-[300px]">
            <Link className="padding-0 text-primary text-left" to={href('/notes')}>
              Remind me...
            </Link>
            <h2 className="mt-4 mb-2 text-xl">Notes</h2>
            <ul className="flex max-h-[250px] flex-col gap-1 overflow-auto md:max-h-[400px]">
              {notes.map(({ id, title, favorite }) => {
                const isActive = false;
                const isPending = false;
                return (
                  <li key={id}>
                    <Link
                      className={cn(
                        'flex w-full items-center justify-between rounded-sm px-4 py-2 hover:no-underline',
                        isActive ? 'bg-primary/80 font-semibold text-white' : 'hover:bg-primary/10 text-primary',
                        isPending && !isActive && 'bg-primary/20 hover:bg-primary/20',
                      )}
                      to={href('/notes/:noteId', { noteId: id })}
                    >
                      <span>{title}</span>
                      <span className="sr-only">{favorite ? 'Favorite note' : ''}</span>
                      <span className="text-yellow-400">{favorite ? '★' : ''}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={cn('mt-0 md:mt-14', isLoading && 'animate-pulse', 'w-full xl:w-1/3')} />
      </main>
      <footer className="self-end pt-8 pb-4">
        <div className="mx-10 flex max-w-xl gap-4 md:mx-40">
          <a href={href('/notes.rss')}>RSS</a>
          <a target="_blank" href="https://github.com/aurorascharff/react-router-v7-notes" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
