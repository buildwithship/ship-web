import Image from 'next/image';
import Link from 'next/link';

import ProjectFeed from '@/components/project/ProjectFeed';

import { makers } from '@/mocks/makers';
import { projects } from '@/mocks/projects';

import styles from './page.module.css';

const categories = [
  '전체',
  'AI',
  'Web',
  'iOS',
  'Android',
  '생산성',
  '커뮤니티',
];

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <h1>프로젝트</h1>

        <p>
          사람들이 직접 만든 앱과
          웹서비스를 살펴보세요.
        </p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.left}>
          <h3>분야</h3>

          {categories.map(
            (category, index) => (
              <button
                key={category}
                className={
                  index === 0
                    ? styles.active
                    : undefined
                }
              >
                {category}
              </button>
            ),
          )}
        </aside>

        <section className={styles.center}>
          <ProjectFeed
            projects={projects}
            initialCount={5}
          />
        </section>

        <aside className={styles.right}>
          <h3>메이커</h3>

          {makers
            .slice(0, 4)
            .map((maker) => (
              <Link
                key={maker.username}
                href={`/makers/${maker.username}`}
              >
                <Image
                  src={maker.avatarUrl}
                  alt={maker.name}
                  width={34}
                  height={34}
                />

                <div>
                  <strong>
                    {maker.name}
                  </strong>

                  <span>
                    {maker.role}
                  </span>
                </div>
              </Link>
            ))}

          <Link
            href="/makers"
            className={styles.makersMore}
          >
            더 보기
          </Link>
        </aside>
      </div>
    </main>
  );
}