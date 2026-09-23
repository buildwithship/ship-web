import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  BriefcaseBusiness,
  Layers3,
} from 'lucide-react';

import ProjectFeed from '@/components/project/ProjectFeed';

import { makers } from '@/mocks/makers';

import {
  newProjects,
  recruitingProjects,
} from '@/mocks/projects';

import styles from './HomeDiscovery.module.css';

const categories = [
  'AI',
  '생산성',
  '라이프스타일',
  '커뮤니티',
  '교육',
  '개발 도구',
];

export default function HomeDiscovery() {
  return (
    <section className={styles.layout}>
      <aside className={styles.left}>
        <div className={styles.sideBlock}>
          <h3>
            <Layers3 size={18} />
            둘러보기
          </h3>

          <div className={styles.categories}>
            {categories.map(
              (category) => (
                <Link
                  key={category}
                  href="/projects"
                >
                  {category}
                </Link>
              ),
            )}
          </div>
        </div>

        <Link
          href="/projects"
          className={styles.sideLink}
        >
          모든 프로젝트
          <ArrowRight size={15} />
        </Link>
      </aside>

      <main className={styles.center}>
        <div className={styles.heading}>
          <div>
            <h2>새로 올라온 프로젝트</h2>

            <p>
              지금 막 SHIP에 올라온
              프로젝트를 확인해보세요.
            </p>
          </div>

          <Link href="/projects">
            전체 보기
          </Link>
        </div>

        <ProjectFeed
          projects={newProjects}
          initialCount={4}
        />
      </main>

      <aside className={styles.right}>
        <div className={styles.sideBlock}>
          <h3>메이커</h3>

          <div className={styles.makers}>
            {makers
              .slice(0, 3)
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
          </div>

          <Link
            href="/makers"
            className={styles.moreLink}
          >
            메이커 더 보기
          </Link>
        </div>

        <div className={styles.sideBlock}>
          <h3>
            <BriefcaseBusiness
              size={18}
            />
            팀원 모집
          </h3>

          <div className={styles.recruiting}>
            {recruitingProjects
              .slice(0, 2)
              .map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                >
                  <Image
                    src={project.logoUrl}
                    alt={project.name}
                    width={32}
                    height={32}
                  />

                  <div>
                    <strong>
                      {project.name}
                    </strong>

                    <span>
                      {project.tagline}
                    </span>
                  </div>
                </Link>
              ))}
          </div>

          <Link
            href="/recruiting"
            className={styles.moreLink}
          >
            모집 프로젝트 보기
          </Link>
        </div>
      </aside>
    </section>
  );
}