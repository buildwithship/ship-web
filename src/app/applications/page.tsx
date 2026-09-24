import {
  UserRoundSearch,
} from 'lucide-react';

import ApplicationManager from '@/components/application/ApplicationManager';

import styles from './page.module.css';

export default function ApplicationsPage() {
  return (
    <main
      className={styles.page}
    >
      <header
        className={styles.header}
      >
        <div
          className={
            styles.headerIcon
          }
        >
          <UserRoundSearch
            size={24}
            strokeWidth={2}
          />
        </div>

        <div>
          <h1>
            지원 관리
          </h1>

          <p>
            내가 지원한 프로젝트와
            내 프로젝트에 들어온
            지원을 확인할 수 있습니다.
          </p>
        </div>
      </header>

      <ApplicationManager />
    </main>
  );
}