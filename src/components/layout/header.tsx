import TopForm from '@/app/components/TopForm';
import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

interface HeaderProps {
  earliestEventDate?: string;
}

export default function Header({ earliestEventDate }: HeaderProps) {
  return (
    <header className="bg-background border-b fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 py-2">
        <div className="flex items-start w-full">
          <div className="basis-0 flex-1 shrink-1">
            <h1 className="text-xl font-semibold">
              Gigs Together
            </h1>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <TopForm visibleEventDate={earliestEventDate} />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4 basis-0 flex-1 shrink-1 justify-end">
            <button
              type="button"
              className="flex items-center gap-2 text-base font-normal text-gray-800"
              aria-label="Current location"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Barcelona
            </button>
            <a href="https://t.me/concerts_together_bcn" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className="text-xl text-black-500 hover:text-black-700" />
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}
