"use client"
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import styles from './page.module.css';
import Header from '@/components/layout/header';

import './style.css';
import { MonthSection } from './components/MonthSection';
import { Card } from './components/GigCard';
import { Event } from '@/types';

const DEFAULT_LOCALE = 'en-US';

const formatMonthTitle = (date: string): string => {
  return new Date(date).toLocaleString(DEFAULT_LOCALE, { month: 'long' }) + ' ' + date.split('-')[0].replace(/20/, '2k');
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleEventDate, setVisibleEventDate] = useState<string | undefined>();
  const eventRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/events?_start=0&_end=1000&_sort=date&_order=ASC');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Memoize event grouping to avoid recalculation on every render
  const eventsByMonth = useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    events.forEach((event) => {
      const monthYear = event.date.split('-').slice(0, 2).join('-');
      grouped[monthYear] = grouped[monthYear] || [];
      grouped[monthYear].push(event);
    });
    return grouped;
  }, [events]);

  // Memoize months array
  const months = useMemo(() => {
    return Object.keys(eventsByMonth).sort().map((date) => ({
      date: date + '-01',
      events: eventsByMonth[date],
    }));
  }, [eventsByMonth]);

  // Memoize the intersection observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleEvents: Array<{ element: Element; top: number }> = [];
    
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const rect = entry.boundingClientRect;
        const headerHeight = 80;
        
        if (rect.top >= headerHeight) {
          visibleEvents.push({ element: entry.target, top: rect.top });
        }
      }
    });

    if (visibleEvents.length > 0) {
      const topMostEvent = visibleEvents.reduce((prev, current) => 
        prev.top < current.top ? prev : current
      );
      
      const eventId = (topMostEvent.element as HTMLElement).getAttribute('data-event-id');
      const event = events.find(e => e.id === eventId);
      if (event) {
        setVisibleEventDate(event.date);
      }
    } else if (events.length > 0) {
      setVisibleEventDate(events[0].date);
    }
  }, [events]);

  // Set up intersection observer to track visible events
  useEffect(() => {
    if (events.length === 0) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0
    });

    // Observe all event elements
    eventRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [events, handleIntersection]);

  // Register event element refs
  const registerEventRef = useCallback((eventId: string, element: HTMLElement | null) => {
    if (element) {
      eventRefs.current.set(eventId, element);
    } else {
      eventRefs.current.delete(eventId);
    }
  }, []);

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
      <Header earliestEventDate={visibleEventDate} />
      <main className={styles.main}>
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
                  <div
                    key={event.id}
                    data-event-id={event.id}
                    ref={(el) => registerEventRef(event.id, el)}
                  >
                    <Card gig={event} />
                  </div>
                ))}
              </MonthSection>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
