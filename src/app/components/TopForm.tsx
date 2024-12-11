import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaCalendar, FaRegCalendar } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const HorizontalForm = () => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (e) => {
    e.preventDefault();
    document.body.classList.toggle('header-expanded');
    setExpanded((prev) => {
      
      return !prev;
    });
  }

  return (
    <form
      className={cn(
        'flex w-fit items-start space-x-4 rounded-md sticky top-0'
      )}
    >
      {/* <Popover>
          <PopoverTrigger asChild>
          <button className="flex items-center gap-1 data-[state=open]:text-gray-700">
            <FaRegCalendar className="h-4 w-4" />
            {new Date('2024-12-12').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </button>

          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
            />
            </PopoverContent>
          </Popover> */}

          <div className="flex flex-col items-center gap-1 data-[state=open]:text-gray-700 w-64">
            <button className="flex items-center gap-1 data-[state=open]:text-gray-700" onClick={handleExpand}>
              <FaRegCalendar className="h-4 w-4" />
              {new Date('2024-12-12').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </button>
            {expanded && <Calendar
              mode="single"
            />}
          </div>

      <div className="flex flex-col items-start justify-start w-16">
        <button className="flex items-center gap-1">
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
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Barcelona
        </button>
      </div>
    </form>
  );
};

export default HorizontalForm;
