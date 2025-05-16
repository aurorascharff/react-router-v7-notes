import { Link, NavLink, Outlet } from 'react-router';
import type { Route } from './+types/notes';
import { prisma } from '~/../db';
import NavButton from '~/components/ui/NavButton';
import { cn } from '~/utils/style';

export function meta() {
  return [{ content: 'React Router v7 Notes', name: 'description' }, { title: 'Notes' }];
}

export async function loader() {
  const notes = await prisma.note.findMany({
    orderBy: [{ favorite: 'desc' }, { createdAt: 'desc' }],
    select: { favorite: true, id: true, title: true },
  });
  return { notes };
}

export default function NotesRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-svh w-full flex-col gap-10 bg-gray-100">
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
          <NavButton to="new">Create note</NavButton>
          <div className="rounded-sm border border-gray-500 p-4 md:w-[300px]">
            <Link className="padding-0 text-primary text-left" to=".">
              Remind me...
            </Link>
            <h2 className="mt-4 mb-2 text-xl">Notes</h2>
            <ul className="flex max-h-[250px] flex-col gap-1 overflow-y-auto md:max-h-[400px]">
              {loaderData.notes.map(({ id, title, favorite }) => {
                return (
                  <NavLink className="hover:no-underline" prefetch="intent" to={id} key={id}>
                    {({ isActive }) => {
                      return (
                        <li
                          className={cn(
                            isActive ? 'bg-primary/80 font-semibold text-white' : 'hover:bg-primary/10 text-primary',
                            'flex w-full items-center justify-between rounded-sm px-4 py-2',
                          )}
                        >
                          <span>{title}</span>
                          <span className="sr-only">{favorite ? 'Favorite note' : ''}</span>
                          <span className="text-yellow-400">{favorite ? '★' : ''}</span>
                        </li>
                      );
                    }}
                  </NavLink>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={cn('mt-0 md:mt-14', false && 'animate-pulse', 'w-full xl:w-1/3')}>
          <Outlet />
        </div>
      </main>
      <footer className="self-end pt-8 pb-4">
        <div className="mx-10 flex max-w-xl gap-4 md:mx-40">
          <Link reloadDocument to="/notes.rss">
            RSS
          </Link>
          <Link target="_blank" reloadDocument to="https://github.com/aurorascharff/react-router-v7-notes">
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
