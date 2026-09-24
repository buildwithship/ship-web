import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowUpRight,
} from 'lucide-react';

import { projects } from '@/mocks/projects';

import styles from './RealtimeRanking.module.css';

export default function RealtimeRanking() {
  const ranking = [...projects]
    .sort(
      (a, b) =>
        b.viewCount +
        b.pushCount * 5 -
        (a.viewCount +
          a.pushCount * 5),
    )
    .slice(0, 5);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span
            className={
              styles.liveDot
            }
          />

          <strong>
            실시간 순위
          </strong>
        </div>

        <span>
          TOP 5
        </span>
      </div>

      <div className={styles.list}>
        {ranking.map(
          (project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className={
                styles.item
              }
            >
              <span
                className={
                  index === 0
                    ? styles.firstRank
                    : styles.rank
                }
              >
                {index + 1}
              </span>

              <Image
                src={
                  project.logoUrl
                }
                alt=""
                width={34}
                height={34}
                className={
                  styles.logo
                }
              />

              <div
                className={
                  styles.content
                }
              >
                <strong>
                  {project.name}
                </strong>

                <span>
                  PUSH{' '}
                  {project.pushCount}
                </span>
              </div>

              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className={
                  styles.arrow
                }
              />
            </Link>
          ),
        )}
      </div>

      <Link
        href="/projects"
        className={styles.more}
      >
        전체 프로젝트 보기
      </Link>
    </section>
  );
}