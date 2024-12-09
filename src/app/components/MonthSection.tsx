import React from 'react';
import { useEffect, useRef } from "react";

type MonthSectionProps = {
  children: React.ReactNode,
  title: string,
  date: string,
}

export function MonthSection({ children, title, date }: MonthSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;

    const root = document.querySelector('main');
    if (!root) return;

    let isOffscreen = false;

    const dayObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const rootRect = entry.rootBounds;

        if (!rootRect) return;

        const isAbove = rect.bottom < rootRect.top;
        const isBelow = rect.top > rootRect.bottom;

        isOffscreen = isAbove || isBelow;
        dayRef.current!.classList.toggle('day-offscreen', isOffscreen);

      },
      { threshold: [0, 0.0001, 0.1, 0.9999, 1],
        root,
      }
    );

    dayObserver.observe(dayRef.current!);

    let titleTop : number | null = null;

    

    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const rootRect = entry.rootBounds;

        if (!rootRect) return;

        // When scrolling up we want to take off sticky
        const delta = titleTop != null ? rect.top - titleTop : 0;
        titleTop = rect.top;

        const isSticky = !isOffscreen && rect.top - rootRect.top < 5 && (delta <= 0 || root.scrollTop < 5);
        titleElement.classList.toggle('day-title-sticky', isSticky);
      },
      { threshold: [0, 0.0001, 0.1, 0.5, 0.9, 1],
        root,
      }
    );

    titleObserver.observe(titleElement.parentElement!);

    return () => {
      dayObserver.unobserve(dayRef.current!);
      titleObserver.unobserve(titleElement.parentElement!);
    };
  }, []);

  return (
    <div id={'day-' + date} ref={dayRef} className="flex flex-col w-full pl-16">
      <div className="day-title-container">
        <div ref={titleRef} className="day-title sticky top-0">
          <h3 className="text-2xl font-bold text-gray-600 top-0 uppercase">{title}</h3>
        </div>
      </div>
      <div className="flex-wrap flex flex-row gap-4">
        {children}
      </div>
    </div>
  )
}