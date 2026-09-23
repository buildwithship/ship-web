'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import ProjectCard from './ProjectCard';

import { Project } from '@/types/project';

import styles from './ProjectFeed.module.css';

interface ProjectFeedProps {
  projects: Project[];
  initialCount?: number;
}

export default function ProjectFeed({
  projects,
  initialCount = 4,
}: ProjectFeedProps) {
  const [visibleCount, setVisibleCount] =
    useState(initialCount);

  const visibleProjects =
    projects.slice(0, visibleCount);

  const hasMore =
    visibleCount < projects.length;

  return (
    <div className={styles.feed}>
      <div className={styles.list}>
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
          className={styles.more}
          onClick={() =>
            setVisibleCount(
              (prev) => prev + 4,
            )
          }
        >
          더보기
          <ChevronDown size={17} />
        </button>
      )}
    </div>
  );
}