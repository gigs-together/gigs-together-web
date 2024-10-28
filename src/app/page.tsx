import styles from './page.module.css';
import Calendar from '@/components/layout/calendar';
import Header from '@/components/layout/header';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>
        <Calendar/>
      </main>
    </div>
  );
}
