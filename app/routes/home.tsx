import { href, Link } from 'react-router';

export function meta() {
  return [{ content: 'React Router v7 Notes', name: 'description' }, { title: 'Notes' }];
}

export default function HomePage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 pt-12 pb-12">
        <h1 className="text-center text-6xl">React Router v7 Notes</h1>
        <nav>
          <ul className="flex list-none gap-4 p-0 text-lg leading-none">
            <li>
              <Link to={href('/notes')}>Load Notes</Link>
            </li>
            <li>
              <a href={href('/notes.rss')}>RSS</a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/aurorascharff/react-router-v7-notes" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
