'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import styles from './page.module.css';
import Header from '@/components/layout/header';

import './style.css';
import { MonthSection } from './components/MonthSection';
import { Card } from './components/GigCard';
import { Event } from '@/types';
import { FaRegCalendar } from 'react-icons/fa';

const DEFAULT_LOCALE = 'en-US';

const formatMonthTitle = (date: string): string => {
  return new Date(date).toLocaleString(DEFAULT_LOCALE, { month: 'long' }) + ' ' + date.split('-')[0].replace(/20/, '2k');
};

const formatFullDate = (dateString?: string) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString(DEFAULT_LOCALE, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleEventDate, setVisibleEventDate] = useState<string | undefined>();

  const eventRefs = useRef<Map<string, HTMLElement>>(new Map());
  const scrollContainerRef = useRef<HTMLElement>();
  const headerOffsetHeightRef = useRef<number>();

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

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // 1) collect intersecting elements (root/rootMargin are already applied by IO)
    const below: Array<{ el: Element; top: number }> = [];
    const above: Array<{ el: Element; top: number }> = [];

    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const top = entry.boundingClientRect.top; // 0 = line just below the header (thanks to rootMargin)
      if (top >= 0) below.push({ el: entry.target, top });
      else above.push({ el: entry.target, top });
    }

    // 2) pick the target: first try the closest element below the header,
    // otherwise pick the closest element above the header
    let targetEl: Element | null = null;
    if (below.length) {
      targetEl = below.reduce((a, b) => (a.top <= b.top ? a : b)).el; // smallest top >= 0
    } else if (above.length) {
      targetEl = above.reduce((a, b) => (a.top >= b.top ? a : b)).el; // largest top < 0
    }

    // 3) if nothing is available in this tick — do a DOM fallback
    // (but don't reset the date to avoid "jumping")
    if (!targetEl && scrollContainerRef.current) {
      const headerH = headerOffsetHeightRef.current ?? 0;
      const all = Array.from(
        scrollContainerRef.current.querySelectorAll<HTMLElement>('[data-event-id]')
      );
      const withTop = all
        .map(el => ({ el, top: el.getBoundingClientRect().top - headerH }));

      const firstBelow = withTop.filter(x => x.top >= 0).sort((a,b) => a.top - b.top)[0];
      const closestAbove = withTop.filter(x => x.top < 0).sort((a,b) => b.top - a.top)[0];

      targetEl = (firstBelow ?? closestAbove)?.el ?? null;
    }

    if (!targetEl) return; // do nothing if no candidate found — avoids flicker

    const eventId = (targetEl as HTMLElement).dataset.eventId ?? '';
    const event = events.find(e => String(e.id) === eventId);
    if (event) setVisibleEventDate(event.date);
  }, [events]);

  // Set up intersection observer to track visible events
  useEffect(() => {
    if (events.length === 0) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-80px 0px -50% 0px',
      threshold: 0,
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
        <Header />
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
        <Header />
        <main className={styles.main}>
          <div className="flex justify-center items-center h-96">
            <div className="text-lg text-red-600">Error: {error}</div>
          </div>
        </main>
      </div>
    );
  }

  const handleDayClick = (day: Date) => {
    console.log('clicked date:', day);
  }

  return (
    <div className={styles.page}>
      <Header earliestEventDate={visibleEventDate} onDayClick={handleDayClick}/>
      <main className={styles.main}>
        <div className="px-8 md:px-16 py-8">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-600">No events found</h2>
              <p className="text-gray-500 mt-2">Check back later for upcoming events!</p>
            </div>
          ) : (
            months.map((day) => {
              const eventsByDay: Record<string, Event[]> = {};
              day.events.forEach(ev => {
                eventsByDay[ev.date] = eventsByDay[ev.date] || [];
                eventsByDay[ev.date].push(ev);
              });

              const orderedDates = Object.keys(eventsByDay).sort();

              return (
                <MonthSection
                  key={day.date}
                  title={formatMonthTitle(day.date)}
                  date={day.date}
                >
                  {orderedDates.map((dateStr, i) => (
                    <div key={dateStr} className="contents">
                      {i !== 0 && (
                        <div className="col-span-full">
                          <div className="w-full border-b border-gray-200 my-6 relative">
                          <span
                            className="inline-flex items-center gap-2 text-base leading-none font-normal text-gray-800 px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
                            <FaRegCalendar className="text-gray-600" />
                            {formatFullDate(dateStr)}
                          </span>
                          </div>
                        </div>
                      )}
                      {eventsByDay[dateStr].map((event) => (
                        <div
                          key={event.id}
                          data-event-id={event.id}
                          ref={(el) => registerEventRef(event.id, el)}
                        >
                          <Card gig={event} />
                        </div>
                      ))}
                    </div>
                  ))}
                </MonthSection>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
