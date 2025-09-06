import type { MouseEvent } from 'react';
import React, { useMemo } from 'react';
import { cn, toLocalYMD } from '@/lib/utils';
import { FaRegCalendar } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { ActiveModifiers } from 'react-day-picker';

interface TopFormProps {
  visibleEventDate?: string;
  onDayClick?: (day: Date, activeModifiers?: ActiveModifiers, e?: MouseEvent) => void;
  availableDates?: string[]; // list of dates that have events (YYYY-MM-DD)
}

const formatDisplayDate = (dateString?: string) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const TopForm = ({ visibleEventDate, onDayClick, availableDates }: TopFormProps) => {
  const availableSet = useMemo(() => new Set(availableDates ?? []), [availableDates]);

  const handleDayClick = (day: Date, activeModifiers?: ActiveModifiers, e?: MouseEvent) => {
    if (activeModifiers?.disabled) return; // ignore clicks on disabled days
    onDayClick?.(day, activeModifiers, e);
  };

  const disabledMatcher = (date: Date) => !availableSet.has(toLocalYMD(date));

  return (
    <form className={cn('flex w-fit items-center space-x-4 rounded-md sticky top-0')}>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 focus:outline-none">
            <span className="inline-flex items-center gap-2 text-base font-normal text-gray-800 px-2 w-[20ch]">
              <FaRegCalendar className="text-gray-600" />
              {formatDisplayDate(visibleEventDate)}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" disabled={disabledMatcher} onDayClick={handleDayClick} />
        </PopoverContent>
      </Popover>
    </form>
  );
};

export default TopForm;
