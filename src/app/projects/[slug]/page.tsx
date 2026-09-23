import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Users,
} from 'lucide-react';

import ProjectDetailActions from '@/components/project/ProjectDetailActions';

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
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className="page-container">
        <Link href="/" className={styles.back}>
          <ArrowLeft size={17} />
          프로젝트
        </Link>

        <section className={styles.header}>
          <div className={styles.projectInfo}>
            <Image
              src={project.logoUrl}
              alt={`${project.name} 로고`}
              width={76}
              height={76}
              className={styles.logo}
            />

            <div>
              <div className={styles.projectTopline}>
                <span>SHIPPED PROJECT</span>

                {project.recruiting && (
                  <span className={styles.recruiting}>
                    <Users size={13} />
                    팀원 모집 중
                  </span>
                )}
              </div>

              <h1>{project.name}</h1>

              <p className={styles.tagline}>
                {project.tagline}
              </p>

              <span className={styles.maker}>
                by {project.maker.name}
              </span>
            </div>
          </div>

          <ProjectDetailActions
            initialPushCount={project.pushCount}
            projectName={project.name}
          />
        </section>

        <div className={styles.banner}>
          <Image
            src={project.bannerUrl}
            alt={`${project.name} 대표 이미지`}
            fill
            priority
            sizes="100vw"
            className={styles.bannerImage}
          />
        </div>

        <section className={styles.content}>
          <div className={styles.main}>
            <div className={styles.section}>
              <span className={styles.sectionLabel}>
                ABOUT
              </span>

              <h2>프로젝트 소개</h2>

              <p>{project.description}</p>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionLabel}>
                CATEGORIES
              </span>

              <div className={styles.tags}>
                {project.categories.map((category) => (
                  <span key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {project.recruiting && (
              <div className={styles.recruitBox}>
                <div>
                  <span>OPEN FOR CREW</span>

                  <h3>
                    이 프로젝트와 함께할 사람을 찾고 있어요.
                  </h3>

                  <p>
                    자세한 모집 포지션은 다음 작업에서
                    연결할 예정입니다.
                  </p>
                </div>

                <button type="button">
                  지원하기
                </button>
              </div>
            )}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.statsBox}>
              <div>
                <strong>
                  {project.viewCount.toLocaleString()}
                </strong>

                <span>
                  <Eye size={15} />
                  Views
                </span>
              </div>

              <div>
                <strong>{project.teamSize}</strong>

                <span>
                  <Users size={15} />
                  Crew
                </span>
              </div>
            </div>

            <div className={styles.links}>
              <span>프로젝트 바로가기</span>

              {project.platforms.map((platform) => (
                <a
                  key={platform.platform}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {platform.platform === 'web' &&
                    'Website'}

                  {platform.platform === 'appStore' &&
                    'App Store'}

                  {platform.platform ===
                    'googlePlay' && 'Google Play'}

                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}