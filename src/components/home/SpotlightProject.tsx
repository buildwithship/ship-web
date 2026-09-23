import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  Eye,
  Users,
} from 'lucide-react';

import PushButton from '@/components/project/PushButton';

import {
  Project,
  ProjectStatus,
} from '@/types/project';

import styles from './SpotlightProject.module.css';

interface SpotlightProjectProps {
  project: Project;
}

function getStatus(
  status: ProjectStatus,
) {
  if (status === 'operating') {
    return {
      text: '운영중',
      className:
        styles.statusOperating,
    };
  }

  if (status === 'inProgress') {
    return {
      text: '진행중',
      className:
        styles.statusProgress,
    };
  }

  return {
    text: '운영종료',
    className:
      styles.statusEnded,
  };
}

function ShipMark() {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <path
        d="M21.6 5.2v18.1L9.7 20.7c2.7-6.9 6.6-12.1 11.9-15.5Z"
        fill="currentColor"
        opacity="0.55"
      />

      <path
        d="M24 8.6v14.9l10.5-2.2C32 15.8 28.5 11.6 24 8.6Z"
        fill="currentColor"
      />

      <path
        d="M8.3 25.2h27.4l-3.6 6.3H12l-3.7-6.3Z"
        fill="currentColor"
        opacity="0.84"
      />

      <path
        d="M9.5 35.3c2.7 1.5 5.3 1.5 8 0 2.7-1.5 5.3-1.5 8 0 2.7 1.5 5.3 1.5 8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SpotlightProject({
  project,
}: SpotlightProjectProps) {
  const status =
    getStatus(project.status);

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <div className={styles.title}>
          <span
            className={styles.lightDot}
          />
          SPOTLIGHT
        </div>

        <span>
          이번 주 주목할 프로젝트
        </span>
      </div>

      <article className={styles.card}>
        <div
          className={styles.lightBeam}
        />

        <div
          className={styles.lightGlow}
        />

        <div
          className={styles.content}
        >
          <div
            className={styles.mark}
          >
            <div
              className={styles.ship}
            >
              <ShipMark />
            </div>

            <div>
              <strong>
                이번 주의 프로젝트
              </strong>

              <span>
                SHIP이 주목하고 있어요
              </span>
            </div>
          </div>

          <div
            className={
              styles.statusRow
            }
          >
            <span
              className={`${styles.status} ${status.className}`}
            >
              {status.text}
            </span>

            {project.recruiting && (
              <span
                className={
                  styles.recruiting
                }
              >
                <Users size={14} />
                팀원 모집
              </span>
            )}
          </div>

          <h2>
            {project.name}
          </h2>

          <p
            className={
              styles.tagline
            }
          >
            {project.tagline}
          </p>

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
              width={27}
              height={27}
            />

            {project.maker.name}
          </Link>

          <div
            className={
              styles.actions
            }
          >
            <Link
              href={`/projects/${project.slug}`}
              className={
                styles.viewButton
              }
            >
              프로젝트 보기
              <ArrowRight
                size={16}
              />
            </Link>

            <PushButton
              initialCount={
                project.pushCount
              }
            />

            <span
              className={
                styles.views
              }
            >
              <Eye size={16} />
              {project.viewCount.toLocaleString()}
            </span>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className={
            styles.imageWrap
          }
        >
          <Image
            src={project.bannerUrl}
            alt={`${project.name} 대표 이미지`}
            fill
            priority
            sizes="50vw"
            className={styles.image}
          />
        </Link>
      </article>
    </section>
  );
}