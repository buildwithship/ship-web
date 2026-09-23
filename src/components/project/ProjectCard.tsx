'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ArrowUp, Eye, Users } from 'lucide-react';

import PlatformLinks from './PlatformLinks';

import { Project } from '@/types/project';

import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

function formatCount(value: number) {
  if (value < 1000) {
    return value.toString();
  }

  return `${(value / 1000).toFixed(1).replace('.0', '')}K`;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const [isPushed, setIsPushed] = useState(false);

  const pushCount =
    project.pushCount + (isPushed ? 1 : 0);

  return (
    <article className={styles.card}>
      <Link
        href={`/projects/${project.slug}`}
        className={styles.imageWrap}
      >
        <Image
          src={project.bannerUrl}
          alt={`${project.name} 프로젝트`}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1100px) 50vw,
            33vw
          "
          className={styles.banner}
        />

        {project.recruiting && (
          <span className={styles.recruiting}>
            <Users size={13} strokeWidth={2} />
            팀원 모집 중
          </span>
        )}
      </Link>

      <div className={styles.body}>
        <div className={styles.identity}>
          <Image
            src={project.logoUrl}
            alt={`${project.name} 로고`}
            width={42}
            height={42}
            className={styles.logo}
          />

          <div className={styles.titleArea}>
            <Link
              href={`/projects/${project.slug}`}
              className={styles.name}
            >
              {project.name}
            </Link>

            <p>{project.tagline}</p>
          </div>
        </div>

        <div className={styles.tags}>
          {project.categories.map((category) => (
            <span key={category}>
              {category}
            </span>
          ))}
        </div>

        <div className={styles.meta}>
          <div className={styles.stats}>
            <button
              type="button"
              className={`${styles.push} ${
                isPushed ? styles.pushActive : ''
              }`}
              onClick={() => {
                setIsPushed((prev) => !prev);
              }}
              aria-pressed={isPushed}
            >
              <ArrowUp size={16} strokeWidth={2.2} />
              {formatCount(pushCount)}
            </button>

            <span className={styles.view}>
              <Eye size={16} strokeWidth={1.8} />
              {formatCount(project.viewCount)}
            </span>
          </div>

          <PlatformLinks links={project.platforms} />
        </div>

        <span className={styles.maker}>
          by {project.maker.name}
        </span>
      </div>
    </article>
  );
}