import { Link, NavLink, Outlet, useNavigation } from 'react-router';
import type { Route } from './+types/notes';
import { prisma } from '~/../db';
import NavButton from '~/components/ui/NavButton';
import { cn } from '~/utils/style';

export const meta = () => {
  return [{ content: 'React Router v7 Notes', name: 'description' }, { title: 'Notes' }];
};

export const loader = async () => {
  const noteListItems = await prisma.note.findMany({
    orderBy: [{ favorite: 'desc' }, { createdAt: 'desc' }],
    select: { favorite: true, id: true, title: true },
  });
  return { noteListItems };
};

export default function NotesRoute({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isLoadingNote = navigation.state === 'loading' && location.pathname !== '/notes/new';

  return (
    <div className="flex min-h-svh w-full flex-col gap-5 bg-gray-100">
      <header className="border-b border-primary py-4 bg-white">
        <div className="mx-10 flex max-w-xl items-center justify-between lg:mx-40">
          <h1 className="text-4xl">
            <Link className="hover:no-underline text-black" to="/">
              <span>React Router v7 Notes</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="mx-10 flex grow flex-col gap-10 py-3 md:flex-row lg:mx-40">
        <div className="flex flex-col gap-4">
          <Link className="padding-0 text-left text-primary" to=".">
            Remind me!
          </Link>
          <NavButton theme="secondary" to="new">
            Create note
          </NavButton>
          <ul className="flex rounded-sm gap-2 flex-col max-h-[300px] md:max-h-[400px] overflow-y-auto w-full md:w-[300px] border border-gray-500 p-4">
            <h2 className="text-lg">Notes</h2>
            {loaderData.noteListItems.map(({ id, title, favorite }) => {
              return (
                <NavLink className="hover:no-underline" prefetch="intent" to={id} key={id}>
                  {({ isActive }) => {
                    return (
                      <li
                        className={cn(
                          isActive ? 'bg-primary/80 font-semibold text-white' : 'hover:bg-primary/10 text-primary',
                          'px-4 py-2 rounded-sm w-full',
                        )}
                      >
                        {title} {favorite ? '★' : ''}
                      </li>
                    );
                  }}
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className={cn('mt-0 md:mt-24', isLoadingNote && 'animate-pulse', 'w-full xl:w-1/3')}>
          <Outlet />
        </div>
      </main>
      <footer className="pb-4 pt-8 self-end">
        <div className="mx-10 flex max-w-xl gap-4 md:mx-40">
          <Link reloadDocument to="/notes.rss">
            RSS
          </Link>
          <Link
            target="_blank"
            reloadDocument
            to="https://github.com/aurorascharff/aurorascharff/react-router-v7-noter"
          >
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
