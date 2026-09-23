import Image from 'next/image';
import Link from 'next/link';

import {
  Anchor,
  ArrowUpRight,
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
      label: '운영중',
      className: styles.statusOperating,
    };
  }

  if (status === 'inProgress') {
    return {
      label: '진행중',
      className: styles.statusProgress,
    };
  }

  return {
    label: '운영종료',
    className: styles.statusEnded,
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

export default function SpotlightProject({
  project,
}: SpotlightProjectProps) {
  const status =
    getStatus(project.status);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div
          className={styles.headingIcon}
        >
          <Anchor
            size={18}
            strokeWidth={2.2}
          />
        </div>

        <div>
          <span>ANCHOR</span>

          <h2>
            추천 프로젝트
          </h2>
        </div>
      </div>

      <article className={styles.card}>
        <Link
          href={`/projects/${project.slug}`}
          className={styles.visual}
        >
          <Image
            src={project.bannerUrl}
            alt={`${project.name} 대표 이미지`}
            fill
            sizes="(max-width: 760px) 100vw, 520px"
            className={styles.banner}
          />

          <div
            className={styles.anchorLabel}
          >
            <Anchor
              size={14}
              strokeWidth={2.2}
            />

            ANCHOR
          </div>
        </Link>

        <div className={styles.content}>
          <div className={styles.badges}>
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
                  size={13}
                  strokeWidth={2}
                />
                팀원 모집
              </span>
            )}
          </div>

          <div
            className={
              styles.projectHeader
            }
          >
            <Image
              src={project.logoUrl}
              alt={`${project.name} 로고`}
              width={50}
              height={50}
              className={styles.logo}
            />

            <div>
              <h3>
                {project.name}
              </h3>

              <p>
                {project.tagline}
              </p>
            </div>
          </div>

          <p
            className={
              styles.description
            }
          >
            {project.description}
          </p>

          <div
            className={styles.categories}
          >
            {project.categories
              .slice(0, 3)
              .map((category) => (
                <span key={category}>
                  {category}
                </span>
              ))}
          </div>

          <div className={styles.footer}>
            <Link
              href={`/makers/${project.maker.username}`}
              className={styles.maker}
            >
              <Image
                src={
                  project.maker.avatarUrl
                }
                alt={
                  project.maker.name
                }
                width={28}
                height={28}
              />

              <span>
                {project.maker.name}
              </span>
            </Link>

            <div
              className={styles.actions}
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
                  size={15}
                  strokeWidth={2}
                />

                {formatCount(
                  project.viewCount,
                )}
              </span>

              <Link
                href={`/projects/${project.slug}`}
                className={
                  styles.detailButton
                }
              >
                보기

                <ArrowUpRight
                  size={15}
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}