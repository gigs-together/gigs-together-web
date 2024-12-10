"use client"
import styles from './page.module.css';
import Header from '@/components/layout/header';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import styled from 'styled-components';

import './style.css';
import { MonthSection } from './components/MonthSection';
import { Card } from './components/GigCard';
import { FaRegCalendarAlt } from "react-icons/fa";
import { Calendar } from '@/components/ui/calendar';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
const DEFAULT_LOCALE = 'en-US';

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
    date: "2025-01-01",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2025-01-01",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2025-01-01",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2025-01-01",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  },
  {
    date: "2025-01-01",
    cover: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a",
    title: "Awesome concert",
    people: 100
  }
];

function generateUniqSerial(): string {  
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
      const r = Math.floor(Math.random() * 16);  
      return r.toString(16);  
});  
}

const eventsByMonth: Record<string, typeof events> = {};

events.forEach((event) => {
  event.id = generateUniqSerial();
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

function formatMonthTitle(date: string): string {
  return new Date(date).toLocaleString(DEFAULT_LOCALE, { month: 'long' }) + ' ' + date.split('-')[0].replace(/20/, '2k');
}

export default function Home() {

  const handleDayChange = (value: string) => {
    document.getElementById('day-' + value)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>
        <div className="flex flex-col items-center gap-1 px-1 border-radius-lg border-gray-200 fixed top-0 bg-white left-0 top-28 w-16">
        <Sheet>
          <SheetTrigger asChild>
            {/* <Button variant="outline">{side}</Button> */}
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
        </div>
        {months.map((day) => (
          <MonthSection
            key={day.date}
            title={formatMonthTitle(day.date)}
            date={day.date}
          >
            {day.events.map((event) => (
              <Card key={event.id} cover={event.cover} title={event.title} people={event.people} />
            ))}
          </MonthSection>
        ))} 
      </main>
    </div>
  );
}
