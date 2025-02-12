'use client';
import { FC } from 'react';
import Link from 'next/link';

const Welcome: FC = () => {
  return (
    <div className="p-4 space-y-4 h-full">
      <div className="py-3 flex flex-col h-full text-center justify-center items-center gap-3 px-10 ">
        <h2 className="text-secondary text-2xl font-bold w-full pb-4">
          Find Your Perfect Pup in Just a Few Clicks!
        </h2>
        <div className="bg-secondary text-primary w-fit p-4 rounded flex flex-col gap-2">
          <p className="text-lg font flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span>
              <strong>Fine tune your search</strong> – Adjust filters to find
              that perfect one.
            </span>
          </p>
          <p className="text-lg font flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span>
              <strong>Love at First Click</strong> – Tap the ❤️ on dogs that
              make your tail wag.
            </span>
          </p>
          <p className="text-lg font-light flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span>
              <strong>Your Perfect Match</strong> – Open your favorites, and
              we’ll help you find <em>the one</em>!
            </span>
          </p>
        </div>
        <Link href="/Browse" className="btn">
          Start Browsing
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
