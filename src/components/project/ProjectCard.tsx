import Image from 'next/image';
import Link from 'next/link';

import {
  Eye,
  Users,
} from 'lucide-react';

import PlatformLinks from '@/components/project/PlatformLinks';
import PushButton from '@/components/project/PushButton';

import {
  Project,
  ProjectStatus,
} from '@/types/project';

import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

function getStatus(
  status: ProjectStatus,
) {
  if (status === 'operating') {
    return {
      label: '운영중',
      className:
        styles.operating,
    };
  }

  if (status === 'inProgress') {
    return {
      label: '진행중',
      className:
        styles.inProgress,
    };
  }

  return {
    label: '운영종료',
    className:
      styles.ended,
  };
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

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const status =
    getStatus(project.status);

  return (
    <article className={styles.card}>
      <Link
        href={`/projects/${project.slug}`}
        className={styles.visual}
      >
        <Image
          src={project.bannerUrl}
          alt={`${project.name} 대표 이미지`}
          fill
          sizes="220px"
          className={styles.banner}
        />

        <div
          className={
            styles.imageBadges
          }
        >
          <span
            className={`${styles.status} ${status.className}`}
          >
            {status.label}
          </span>

          {project.recruiting && (
            <span
              className={
                styles.recruiting
              }
            >
              <Users
                size={12}
                strokeWidth={2}
              />

              모집중
            </span>
          )}
        </div>
      </Link>

      <div className={styles.content}>
        <div
          className={
            styles.mainContent
          }
        >
          <div
            className={
              styles.titleRow
            }
          >
            <Link
              href={`/projects/${project.slug}`}
            >
              <h3>
                {project.name}
              </h3>
            </Link>
          </div>

          <p
            className={
              styles.tagline
            }
          >
            {project.tagline}
          </p>

          <p
            className={
              styles.description
            }
          >
            {project.description}
          </p>

          <div
            className={
              styles.categories
            }
          >
            {project.categories
              .slice(0, 3)
              .map(
                (category) => (
                  <span
                    key={category}
                  >
                    {category}
                  </span>
                ),
              )}
          </div>
        </div>

        <div
          className={
            styles.metaFooter
          }
        >
          <Link
            href={`/makers/${project.maker.username}`}
            className={styles.maker}
          >
            <Image
              src={
                project.maker
                  .avatarUrl
              }
              alt={
                project.maker.name
              }
              width={26}
              height={26}
            />

            <span>
              {
                project.maker.name
              }
            </span>
          </Link>

          <div
            className={
              styles.metrics
            }
          >
            <PushButton
              initialCount={
                project.pushCount
              }
              compact
            />

            <span
              className={styles.views}
            >
              <Eye
                size={14}
                strokeWidth={2}
              />

              {formatCount(
                project.viewCount,
              )}
            </span>
          </div>
        </div>
      </div>

      {project.platforms.length >
        0 && (
        <div
          className={
            styles.platformFooter
          }
        >
          <span
            className={
              styles.platformLabel
            }
          >
            바로가기
          </span>

          <PlatformLinks
            links={
              project.platforms
            }
            compact
          />
        </div>
      )}
    </article>
  );
}