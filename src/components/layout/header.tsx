import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-background border-b fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-semibold">
            Gigs Together
          </h1>
          <div className="flex items-center space-x-4">
            <a href="https://t.me/concerts_together_bcn" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className="text-xl text-black-500 hover:text-black-700" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
