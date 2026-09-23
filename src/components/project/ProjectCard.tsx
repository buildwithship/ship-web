import Image from 'next/image';
import Link from 'next/link';

import {
  Eye,
  Users,
} from 'lucide-react';

import PlatformLinks from './PlatformLinks';
import PushButton from './PushButton';

import {
  Project,
  ProjectStatus,
} from '@/types/project';

import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

function formatCount(
  value: number,
) {
  if (value < 1000) {
    return value.toString();
  }

  return `${(value / 1000)
    .toFixed(1)
    .replace('.0', '')}K`;
}

function getStatus(
  status: ProjectStatus,
) {
  if (status === 'operating') {
    return {
      label: '운영중',
      className:
        styles.statusOperating,
    };
  }

  if (status === 'inProgress') {
    return {
      label: '진행중',
      className:
        styles.statusProgress,
    };
  }

  return {
    label: '운영종료',
    className:
      styles.statusEnded,
  };
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const status =
    getStatus(project.status);

  return (
    <article className={styles.card}>
      <Link
        href={`/projects/${project.slug}`}
        className={styles.imageWrap}
      >
        <Image
          src={project.bannerUrl}
          alt={`${project.name} 대표 이미지`}
          fill
          sizes="220px"
          className={styles.banner}
        />

        <span
          className={`${styles.status} ${status.className}`}
        >
          {status.label}
        </span>

        {project.recruiting && (
          <span
            className={styles.recruit}
          >
            <Users
              size={14}
              strokeWidth={2}
            />
            팀원 모집
          </span>
        )}
      </Link>

      <div className={styles.content}>
        <div className={styles.projectHeader}>
          <Image
            src={project.logoUrl}
            alt={`${project.name} 로고`}
            width={44}
            height={44}
            className={styles.logo}
          />

          <div className={styles.title}>
            <Link
              href={`/projects/${project.slug}`}
            >
              {project.name}
            </Link>

            <p>
              {project.tagline}
            </p>
          </div>
        </div>

        <div className={styles.platformRow}>
          <PlatformLinks
            links={project.platforms}
          />
        </div>

        <div className={styles.bottom}>
          <Link
            href={`/makers/${project.maker.username}`}
            className={styles.maker}
          >
            <Image
              src={project.maker.avatarUrl}
              alt={project.maker.name}
              width={27}
              height={27}
            />

            <span>
              {project.maker.name}
            </span>
          </Link>

          <div className={styles.stats}>
            <PushButton
              initialCount={
                project.pushCount
              }
              compact
            />

            <span className={styles.views}>
              <Eye
                size={16}
                strokeWidth={2}
              />

              {formatCount(
                project.viewCount,
              )}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}