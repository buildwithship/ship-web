import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

import ProjectCard from '@/components/project/ProjectCard';
import WatchButton from '@/components/maker/WatchButton';

import {
  getMakerByUsername,
  makers,
} from '@/mocks/makers';

import { projects } from '@/mocks/projects';

import styles from './page.module.css';

interface MakerPageProps {
  params: Promise<{
    username: string;
  }>;
}

function GitHubIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.221-.253-4.555-1.112-4.555-4.945 0-1.092.39-1.985 1.029-2.684-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.684 0 3.842-2.337 4.688-4.566 4.936.359.31.678.921.678 1.856 0 1.34-.012 2.421-.012 2.75 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function generateStaticParams() {
  return makers.map((maker) => ({
    username: maker.username,
  }));
}

export default async function MakerPage({
  params,
}: MakerPageProps) {
  const { username } = await params;

  const maker =
    getMakerByUsername(username);

  if (!maker) {
    notFound();
  }

  const makerProjects = projects.filter(
    (project) =>
      project.maker.username ===
      maker.username,
  );

  return (
    <main className={styles.page}>
      <section className={styles.profile}>
        <div className={styles.profileTop}>
          <Image
            src={maker.avatarUrl}
            alt={`${maker.name} 프로필`}
            width={88}
            height={88}
            className={styles.avatar}
          />

          <div className={styles.actions}>
            <WatchButton
              initialCount={
                maker.subscriberCount
              }
              showCount
            />

            <button
              type="button"
              className={styles.chatButton}
            >
              <MessageCircle size={16} />
              커피챗
            </button>
          </div>
        </div>

        <div className={styles.identity}>
          <h1>{maker.name}</h1>

          <span>{maker.role}</span>

          <p>{maker.bio}</p>
        </div>

        <div className={styles.links}>
          {maker.githubUrl && (
            <a
              href={maker.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon size={16} />
              GitHub
            </a>
          )}

          {maker.websiteUrl && (
            <a
              href={maker.websiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={16} />
              Website
            </a>
          )}
        </div>

        <div className={styles.stats}>
          <div>
            <strong>
              {maker.projectCount}
            </strong>

            <span>프로젝트</span>
          </div>

          <div>
            <strong>
              {maker.subscriberCount}
            </strong>

            <span>구독자</span>
          </div>

          {maker.openToProject && (
            <div className={styles.open}>
              프로젝트 참여 가능
            </div>
          )}
        </div>

        <div className={styles.skills}>
          {maker.skills.map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.projects}>
        <div className={styles.sectionHeading}>
          <h2>참여한 프로젝트</h2>

          <span>
            {makerProjects.length}
          </span>
        </div>

        {makerProjects.length > 0 ? (
          <div className={styles.grid}>
            {makerProjects.map(
              (project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ),
            )}
          </div>
        ) : (
          <div className={styles.empty}>
            아직 공개한 프로젝트가 없습니다.
          </div>
        )}
      </section>

      <Link
        href="/makers"
        className={styles.back}
      >
        다른 메이커 보기
      </Link>
    </main>
  );
}