import { href, Link } from 'react-router';

export function meta() {
  return [{ content: 'React Router v7 Notes', name: 'description' }, { title: 'Notes' }];
}

export default function IndexRoute() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 pt-12 pb-12">
        <h1 className="text-center text-6xl">React Router v7 Notes</h1>
        <nav>
          <ul className="flex list-none gap-4 p-0 text-lg leading-none">
            <li>
              <Link to={href('/notes')}>View Notes</Link>
            </li>
            <li>
              <Link to="/notes.rss">RSS</Link>
            </li>
            <li>
              <Link target="_blank" to="https://github.com/aurorascharff/react-router-v7-notes">
                GitHub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
