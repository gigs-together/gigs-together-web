import React from 'react';
import { useRef } from 'react';

type MonthSectionProps = {
  children: React.ReactNode;
  title: string;
  date: string;
};

export function MonthSection({ children, title, date }: MonthSectionProps) {
  const dayRef = useRef<HTMLDivElement>(null);

  return (
    <div id={'day-' + date} ref={dayRef} className="flex flex-col w-full">
      <div className="day-title-container">
        <div className="day-title">
          <h3 className="text-2xl font-bold text-gray-600 top-0 uppercase">{title}</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {children}
      </div>
    </div>
  );
}
