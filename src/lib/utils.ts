import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert a Date (local time) or a YYYY-MM-DD string into a normalized YYYY-MM-DD string
export function toLocalYMD(d: Date | string): string {
  // If a Date is passed (e.g., from DayPicker) — use local date parts
  if (d instanceof Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  // If a "YYYY-MM-DD" string is passed — parse manually, without new Date(...) (to avoid timezone shifts)
  const [y, m, day] = d.split('-').map(Number);
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
