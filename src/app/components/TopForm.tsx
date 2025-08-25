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
    </form>
  );
};

export default HorizontalForm;
