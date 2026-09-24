import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowUpRight,
  Crown,
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
          className={
            styles.headingLeft
          }
        >
          <div
            className={
              styles.crownIcon
            }
          >
            <Crown
              size={19}
              strokeWidth={2}
            />
          </div>

          <div>
            <span
              className={
                styles.eyebrow
              }
            >
              SHIP PICK
            </span>

            <h2>
              주목받는 프로젝트
            </h2>
          </div>
        </div>

        <span
          className={
            styles.headingDescription
          }
        >
          지금 많이 보고 있는 프로젝트
        </span>
      </div>

      <article className={styles.card}>
        <div
          className={
            styles.featureBar
          }
        >
          <div
            className={
              styles.featureLabel
            }
          >
            <Crown
              size={15}
              strokeWidth={2.1}
            />

            <strong>
              FEATURED
            </strong>
          </div>

          <span
            className={
              styles.featureText
            }
          >
            SHIP PICK
          </span>
        </div>

        <div className={styles.body}>
          <Link
            href={`/projects/${project.slug}`}
            className={styles.visual}
          >
            <Image
              src={project.bannerUrl}
              alt={`${project.name} 대표 이미지`}
              fill
              sizes="(max-width: 720px) 100vw, 520px"
              className={styles.banner}
            />

            <div
              className={
                styles.visualLabel
              }
            >
              <Crown
                size={13}
                strokeWidth={2.2}
              />

              PICK
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
                    size={12}
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
                width={52}
                height={52}
                className={styles.logo}
              />

              <div
                className={
                  styles.projectTitle
                }
              >
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

            <div className={styles.bottom}>
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
                  width={28}
                  height={28}
                />

                <span>
                  {
                    project.maker
                      .name
                  }
                </span>
              </Link>

              <div
                className={
                  styles.actions
                }
              >
                <PushButton
                  initialCount={
                    project.pushCount
                  }
                  compact
                />

                <span
                  className={
                    styles.views
                  }
                >
                  <Eye
                    size={14}
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
                  자세히

                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}