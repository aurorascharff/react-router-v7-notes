import React from 'react';
import { href } from 'react-router';

export default function Footer() {
  return (
    <footer className="self-end pt-8 pb-4">
      <div className="mx-10 flex max-w-xl gap-4 md:mx-40">
        <a href={href('/notes.rss')}>RSS</a>
        <a target="_blank" href="https://github.com/aurorascharff/react-router-v7-notes" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}
