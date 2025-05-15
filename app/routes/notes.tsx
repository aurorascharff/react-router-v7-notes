import { Link, Outlet } from 'react-router';
import type { Route } from './+types/notes';
import { prisma } from '~/../db';
import NavButton from '~/components/ui/NavButton';
import { cn } from '~/utils/style';

export const meta = () => {
  return [{ content: 'Noteworthy App', name: 'description' }, { title: 'Notes' }];
};

export const loader = async () => {
  const noteListItems = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' },
    select: { favorite: true, id: true, title: true },
    take: 10,
  });
  return { noteListItems };
};

export default function NotesRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-[100svh] w-full flex-col gap-5 bg-blue">
      <header className="border-b-2 border-blue-light py-4">
        <div className="mx-10 flex max-w-xl items-center justify-between lg:mx-40">
          <h1 className="text-5xl">
            <Link className="font-display text-white hover:no-underline" to="/">
              <span>Note📝worthy</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="mx-10 flex grow flex-col gap-10 py-3 md:flex-row lg:mx-40">
        <div className="flex min-w-max flex-col gap-y-5">
          <Link className="padding-0 text-left text-teal hover:underline" to=".">
            Random note
          </Link>
          <p>Recent notes:</p>
          <ul>
            {loaderData.noteListItems.map(({ id, title, favorite }) => {
              return (
                <li key={id}>
                  <Link prefetch="intent" to={id}>
                    {title} {favorite ? '★' : ''}
                  </Link>
                </li>
              );
            })}
          </ul>
          <NavButton to="new">Add new note</NavButton>
        </div>
        <div className={cn(false && 'animate-pulse', 'w-full xl:w-1/3')}>
          <Outlet />
        </div>
      </main>
      <footer className="border-t-2 border-blue-light pb-4 pt-8">
        <div className="mx-10 flex max-w-xl gap-4 md:mx-40">
          <Link reloadDocument to="/notes.rss">
            RSS
          </Link>
        </div>
      </footer>
    </div>
  );
}
