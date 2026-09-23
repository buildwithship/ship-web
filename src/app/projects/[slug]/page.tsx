import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ArrowLeft,
  Eye,
  Users,
} from 'lucide-react';

import PlatformLinks from '@/components/project/PlatformLinks';
import ProjectDetailActions from '@/components/project/ProjectDetailActions';
import ProjectGallery from '@/components/project/gallery/ProjectGallery';

import {
  getProjectBySlug,
  projects,
} from '@/mocks/projects';

import styles from './page.module.css';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map(
    (project) => ({
      slug: project.slug,
    }),
  );
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } =
    await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusLabel =
    project.status ===
    'operating'
      ? '운영중'
      : project.status ===
          'inProgress'
        ? '진행중'
        : '운영종료';

  const galleryImages =
    project.galleryUrls &&
    project.galleryUrls.length >
      0
      ? project.galleryUrls
      : [project.bannerUrl];

  return (
    <main
      className={styles.page}
    >
      <Link
        href="/projects"
        className={styles.back}
      >
        <ArrowLeft
          size={18}
        />
        프로젝트
      </Link>

      <section
        className={styles.header}
      >
        <div
          className={styles.identity}
        >
          <Image
            src={project.logoUrl}
            alt={`${project.name} 로고`}
            width={78}
            height={78}
            className={styles.logo}
          />

          <div
            className={
              styles.headerContent
            }
          >
            <div
              className={
                styles.statusRow
              }
            >
              <span
                className={`${styles.status} ${
                  project.status ===
                  'operating'
                    ? styles.statusOperating
                    : project.status ===
                        'inProgress'
                      ? styles.statusProgress
                      : styles.statusEnded
                }`}
              >
                {statusLabel}
              </span>

              {project.recruiting && (
                <span
                  className={
                    styles.recruiting
                  }
                >
                  <Users
                    size={14}
                  />
                  팀원 모집
                </span>
              )}
            </div>

            <h1>
              {project.name}
            </h1>

            <p>
              {project.tagline}
            </p>

            <Link
              href={`/makers/${project.maker.username}`}
              className={
                styles.maker
              }
            >
              <Image
                src={
                  project.maker
                    .avatarUrl
                }
                alt={
                  project.maker
                    .name
                }
                width={25}
                height={25}
              />

              <span>
                {
                  project.maker
                    .name
                }
              </span>
            </Link>
          </div>
        </div>

        <ProjectDetailActions
          initialPushCount={
            project.pushCount
          }
          projectName={
            project.name
          }
        />
      </section>

      <ProjectGallery
        images={galleryImages}
        projectName={
          project.name
        }
      />

      <section
        className={styles.layout}
      >
        <div
          className={styles.main}
        >
          <section
            className={
              styles.contentSection
            }
          >
            <h2>
              프로젝트 소개
            </h2>

            <p>
              {
                project.description
              }
            </p>
          </section>

          {project.recruiting && (
            <section
              className={
                styles.recruitBox
              }
            >
              <div
                className={
                  styles.recruitIcon
                }
              >
                <Users
                  size={21}
                />
              </div>

              <div>
                <strong>
                  함께할 팀원을 찾고
                  있어요
                </strong>

                <p>
                  모집 중인 포지션을
                  확인하고 프로젝트에
                  지원할 수 있습니다.
                </p>
              </div>

              <button
                type="button"
              >
                모집 보기
              </button>
            </section>
          )}
        </div>

        <aside
          className={styles.sidebar}
        >
          <section
            className={
              styles.sideBlock
            }
          >
            <h3>
              프로젝트 정보
            </h3>

            <div
              className={
                styles.stats
              }
            >
              <div>
                <Eye
                  size={18}
                />

                <span>
                  조회
                </span>

                <strong>
                  {project.viewCount.toLocaleString()}
                </strong>
              </div>

              <div>
                <Users
                  size={18}
                />

                <span>
                  참여 인원
                </span>

                <strong>
                  {
                    project.teamSize
                  }
                </strong>
              </div>
            </div>
          </section>

          <section
            className={
              styles.sideBlock
            }
          >
            <h3>분야</h3>

            <div
              className={
                styles.tags
              }
            >
              {project.categories.map(
                (
                  category,
                ) => (
                  <span
                    key={
                      category
                    }
                  >
                    {
                      category
                    }
                  </span>
                ),
              )}
            </div>
          </section>
        </aside>
      </section>

      <section
        className={
          styles.serviceLinks
        }
      >
        <div
          className={
            styles.serviceLinksHeading
          }
        >
          <h2>
            서비스 바로가기
          </h2>

          <p>
            실제 서비스를 확인해보세요.
          </p>
        </div>

        <div
          className={
            styles.serviceLinksContent
          }
        >
          <PlatformLinks
            links={
              project.platforms
            }
          />
        </div>
      </section>
    </main>
  );
}