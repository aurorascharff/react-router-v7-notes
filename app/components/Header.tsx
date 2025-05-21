import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="border-primary border-b bg-white py-4">
      <div className="mx-10 flex max-w-xl items-center justify-between lg:mx-40">
        <h1 className="text-4xl">
          <Link className="text-black hover:no-underline" to="/">
            <span>React Router v7 Notes</span>
          </Link>
        </h1>
      </div>
    </header>
  );
}
