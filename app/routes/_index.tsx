import { Link } from 'react-router';

export const meta = () => {
  return [{ content: 'Noteworthy App', name: 'description' }, { title: 'Noteworthy' }];
};

export default function IndexRoute() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center pb-12 pt-12">
        <h1 className="text-center text-6xl text-shadow">
          Note <span className="block text-6xl uppercase leading-none md:text-9xl">worthy</span>
        </h1>
        <nav>
          <ul className="flex list-none gap-4 p-0 text-lg leading-none">
            <li>
              <Link className="decoration-wavy decoration-1" to="notes">
                View Notes
              </Link>
            </li>
            <li>
              <Link className="decoration-wavy decoration-1" to="/notes.rss">
                RSS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
