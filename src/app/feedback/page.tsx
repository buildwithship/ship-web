import Link from 'next/link';

import {
  ArrowLeft,
  MessageSquarePlus,
} from 'lucide-react';

import FeedbackForm from '@/components/feedback/FeedbackForm';

import styles from './page.module.css';

export default function FeedbackPage() {
  return (
    <main className={styles.page}>
      <Link
        href="/"
        className={styles.back}
      >
        <ArrowLeft size={17} />
        돌아가기
      </Link>

      <header className={styles.header}>
        <div
          className={
            styles.icon
          }
        >
          <MessageSquarePlus
            size={25}
            strokeWidth={2}
          />
        </div>

        <div>
          <h1>
            건의함
          </h1>

          <p>
            SHIP을 사용하면서
            불편했던 점이나
            필요한 기능을
            알려주세요.
          </p>
        </div>
      </header>

      <FeedbackForm />
    </main>
  );
}