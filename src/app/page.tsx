import styles from './page.module.css';
import Calendar from '@/components/layout/calendar';
import Header from '@/components/layout/header';
import { Separator } from '@/components/ui/separator';

export function DaySection({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="text-2xl font-bold w-36 flex-shrink-0">
        {title}
        <Separator orientation="horizontal" />
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

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>
        <DaySection title='December 9'>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a"/>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a"/>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F905877343%2F2407230629043%2F1%2Foriginal.20241125-122702?crop=focalpoint&fit=crop&w=512&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=15e34abb8d4071b78436f10e3e5eae7a"/>
        </DaySection>
        <DaySection title='December 10'>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F901371753%2F2504186999801%2F1%2Foriginal.20241118-171027?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C20%2C2378%2C1189&s=78c0370bd50f40cd5373c11da5994e57"/>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F901371753%2F2504186999801%2F1%2Foriginal.20241118-171027?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C20%2C2378%2C1189&s=78c0370bd50f40cd5373c11da5994e57"/>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F901371753%2F2504186999801%2F1%2Foriginal.20241118-171027?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C20%2C2378%2C1189&s=78c0370bd50f40cd5373c11da5994e57"/>
          <Card cover="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F901371753%2F2504186999801%2F1%2Foriginal.20241118-171027?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C20%2C2378%2C1189&s=78c0370bd50f40cd5373c11da5994e57"/>
        </DaySection>
      </main>
    </div>
  );
}
