"use client"
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from '@/components/layout/header';

import './style.css';
import { MonthSection } from './components/MonthSection';
import { Card } from './components/GigCard';
import { Event } from '@/types';

const DEFAULT_LOCALE = 'en-US';

function formatMonthTitle(date: string): string {
  return new Date(date).toLocaleString(DEFAULT_LOCALE, { month: 'long' }) + ' ' + date.split('-')[0].replace(/20/, '2k');
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/events?_start=0&_end=1000&_sort=date&_order=ASC');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const eventsData = await response.json();
        console.log('Fetched events:', eventsData);
        
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Group events by month
  const eventsByMonth: Record<string, Event[]> = {};
  events.forEach((event) => {
    const monthYear = event.date.split('-').slice(0, 2).join('-');
    eventsByMonth[monthYear] = eventsByMonth[monthYear] || [];
    eventsByMonth[monthYear].push(event);
  });

  const months = Object.keys(eventsByMonth).sort().map((date) => {
    return {
      date: date + '-01',
      events: eventsByMonth[date],
    }
  });

  console.log('Events state:', events);
  console.log('Events by month:', eventsByMonth);
  console.log('Months:', months);

  if (loading) {
    return (
      <div className={styles.page}>
        <Header/>
        <main className={styles.main}>
          <div className="flex justify-center items-center h-96">
            <div className="text-lg">Loading events...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Header/>
        <main className={styles.main}>
          <div className="flex justify-center items-center h-96">
            <div className="text-lg text-red-600">Error: {error}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>
        {/* <div className="flex flex-col items-center gap-1 px-1 border-radius-lg border-gray-200 fixed top-0 bg-white left-0 top-28 w-16">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-sm bg-black font-bold text-white uppercase w-10 h-10 rounded-full flex flex-col items-center justify-center">
              <FaRegCalendarAlt />
              <span className="text-xs">2024</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Select a date</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-sm font-bold text-gray-500">December 2024</h4>
              <Calendar
                  mode="single"
              />
              <h4 className="text-sm font-bold text-gray-500">January 2025</h4>
              <Calendar
                  mode="single"
                />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

          <StyledToggleGroup type="single" orientation="vertical" onValueChange={handleDayChange}>
            {months.map((day) => (
              <StyledToggleGroupItem key={day.date} value={day.date} aria-label={day.date}>
                {new Date(day.date).toLocaleString(DEFAULT_LOCALE, { month: 'short' })}
              </StyledToggleGroupItem>
            ))}
          </StyledToggleGroup>
        </div> */}
        <div className="px-8 md:px-16 py-8">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600">No events found</h2>
              <p className="text-gray-500 mt-2">Check back later for upcoming events!</p>
            </div>
          ) : (
            months.map((day) => (
              <MonthSection
                key={day.date}
                title={formatMonthTitle(day.date)}
                date={day.date}
              >
                {day.events.map((event) => (
                  <Card key={event.id} gig={event} />
                ))}
              </MonthSection>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
