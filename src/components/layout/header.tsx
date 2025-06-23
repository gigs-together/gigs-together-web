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
            <a href="https://t.me/concerts_together_bcn" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane className="text-xl text-black-500 hover:text-black-700" />
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}
