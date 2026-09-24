'use client';

import {
  useState,
} from 'react';

import ProjectCard from '@/components/project/ProjectCard';

import {
  projects,
} from '@/mocks/projects';

import styles from './HomeDiscovery.module.css';

const INITIAL_COUNT = 5;
const LOAD_COUNT = 4;

export default function HomeDiscovery() {
  const [
    visibleCount,
    setVisibleCount,
  ] = useState(INITIAL_COUNT);

  const visibleProjects =
    projects.slice(
      0,
      visibleCount,
    );

  const hasMore =
    visibleCount <
    projects.length;

  return (
    <section
      className={styles.section}
    >
      <div
        className={styles.header}
      >
        <div>
          <h2>
            프로젝트
          </h2>

          <p>
            새롭게 만들어지고 있는
            프로젝트를 만나보세요.
          </p>
        </div>

        <span>
          {projects.length}개
        </span>
      </div>

      <div
        className={styles.list}
      >
        {visibleProjects.map(
          (project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ),
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          className={
            styles.moreButton
          }
          onClick={() =>
            setVisibleCount(
              (prev) =>
                prev +
                LOAD_COUNT,
            )
          }
        >
          프로젝트 더보기
        </button>
      )}
    </section>
  );
}