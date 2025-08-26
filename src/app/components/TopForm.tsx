import React from 'react';  
import { cn } from '@/lib/utils';
import { FaRegCalendar } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TopFormProps {
  visibleEventDate?: string;
}

const HorizontalForm = ({ visibleEventDate }: TopFormProps) => {
  const formatDisplayDate = (dateString?: string) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <form
      className={cn(
        'flex w-fit items-center space-x-4 rounded-md sticky top-0'
      )}
    >
      <Popover>
          <PopoverTrigger asChild>
          <button className="flex items-center gap-2 focus:outline-none">
            <span className="inline-flex items-center gap-2 text-base font-normal text-gray-800 pl-1 pr-2">
              <FaRegCalendar className="text-gray-600" />
              {formatDisplayDate(visibleEventDate)}
            </span>
          </button>

          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
            />
            </PopoverContent>
          </Popover>


      <div className="flex flex-col">
        <button className="flex items-center gap-2">
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
