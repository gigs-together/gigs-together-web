"use client"
import styles from './page.module.css';
import Header from '@/components/layout/header';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import styled from 'styled-components';

import './style.css';
import { useEffect, useRef } from 'react';

type DaySectionProps = {
  children: React.ReactNode,
  title: string,
  date: string,
}

export function DaySection({ children, title, date }: DaySectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const root = document.querySelector('main');
    if (!root) return;

    const dayObserver = new IntersectionObserver(
      ([entry]) => {
        const isOffscreen = entry.boundingClientRect.y + entry.boundingClientRect.height < entry.rootBounds!.top!;
        dayRef.current!.classList.toggle('day-offscreen', isOffscreen);

        const isSticky = entry.rootBounds!.top >= entry.boundingClientRect.top - 5;
        titleElement.classList.toggle('day-title-sticky', isSticky);
      },
      { threshold: [0, 0.0001, 0.9999, 1],
        root,
      }
    );

    dayObserver.observe(dayRef.current!);

    return () => {
      dayObserver.unobserve(dayRef.current!);
    };
  }, []);


  return (
    <div id={'day-' + date} ref={dayRef} className="flex flex-col w-full pl-16">
      <div className="day-title-container">
        <div ref={titleRef} className="day-title">
          <h3 className="text-2xl font-bold text-gray-600 sticky top-0">{title}</h3>
          <Separator orientation="horizontal" className="mb-3 h-1 bg-gray-500" />
        </div>
      </div>
      <div className="flex-wrap flex flex-row gap-4">
        {children}
      </div>
    </div>
  )
}

export function Card({ cover }: { cover: string }) {

return (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={cover} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Awesome concert</h5>
        </a>
        <div className="flex flex-row gap-4 items-center">
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Join
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
          <div className="flex-1"></div>
          <p className="text-sm text-gray-500">100 people going</p>
        </div>
    </div>
    </div>
  )
}

const StyledToggleGroup = styled(ToggleGroup)`
  display: inline-flex;
  flex-direction: column;
`

const StyledToggleGroupItem = styled(ToggleGroupItem)`
  font-size: 0.8rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #a0a0a0;
  color: #a0a0a0;
`

const events = [
  {
    date: "2024-12-09",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-09",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-09",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-10",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-10",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-10",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-10",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-11",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-11",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-11",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-12",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-12",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2024-12-12",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  }
];

const eventsByDate: Record<string, typeof events> = {};

events.forEach((event) => {
  const date = event.date;
  eventsByDate[date] = eventsByDate[date] || [];
  eventsByDate[date].push(event);
});

const days = Object.keys(eventsByDate).sort().map((date) => {
  return {
    date: date,
    events: eventsByDate[date],
  }
});

export default function Home() {

  const handleDayChange = (value: string) => {
    document.getElementById('day-' + value)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>
        <div className="flex flex-col items-center gap-1 p-1 border-radius-lg border-gray-200 fixed top-0 bg-white left-0 top-32 w-16">
          <strong className="bg-black text-white uppercase w-10 h-10 rounded-full flex items-center justify-center">Dec</strong>
          <StyledToggleGroup type="single" orientation="vertical" onValueChange={handleDayChange}>
            {days.map((day) => (
              <StyledToggleGroupItem key={day.date} value={day.date} aria-label={day.date}>
                {new Date(day.date).getDate()}
              </StyledToggleGroupItem>
            ))}
          </StyledToggleGroup>
        </div>
        {days.map((day) => (
          <DaySection key={day.date} title={day.date} date={day.date}>
            {day.events.map((event) => (
              <Card key={event.title} cover={event.cover} />
            ))}
          </DaySection>
        ))}
      </main>
    </div>
  );
}
