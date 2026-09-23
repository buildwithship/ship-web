'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  ArrowRight,
  ArrowUp,
  Eye,
  Users,
} from 'lucide-react';

import PlatformLinks from '@/components/project/PlatformLinks';

import { Project } from '@/types/project';

import styles from './SpotlightProject.module.css';

interface SpotlightProjectProps {
  project: Project;
}

function formatCount(value: number) {
  if (value < 1000) {
    return value.toString();
  }

  return `${(value / 1000).toFixed(1).replace('.0', '')}K`;
}

export default function SpotlightProject({
  project,
}: SpotlightProjectProps) {
  const [isPushed, setIsPushed] = useState(false);

  const pushCount =
    project.pushCount + (isPushed ? 1 : 0);

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div className={styles.label}>
          <span />
          SPOTLIGHT
        </div>

        <p>이번 주 주목할 단 하나의 프로젝트</p>
      </div>

      <article className={styles.card}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.logoWrap}>
              <div className={styles.logoGlow} />

              <Image
                src={project.logoUrl}
                alt={`${project.name} 로고`}
                width={58}
                height={58}
                className={styles.logo}
              />
            </div>

            {project.recruiting && (
              <span className={styles.recruiting}>
                <Users size={13} />
                OPEN FOR CREW
              </span>
            )}
          </div>

          <div className={styles.copy}>
            <span>by {project.maker.name}</span>

            <h2>{project.name}</h2>

            <h3>{project.tagline}</h3>

            <p>{project.description}</p>
          </div>

          <div className={styles.bottom}>
            <div className={styles.stats}>
              <button
                type="button"
                className={`${styles.push} ${
                  isPushed ? styles.pushActive : ''
                }`}
                onClick={() => {
                  setIsPushed((prev) => !prev);
                }}
              >
                <ArrowUp size={16} />
                {formatCount(pushCount)}
              </button>

              <span>
                <Eye size={16} />
                {formatCount(project.viewCount)}
              </span>

              <PlatformLinks links={project.platforms} />
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className={styles.cta}
            >
              프로젝트 보기
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className={styles.visual}
        >
          <Image
            src={project.bannerUrl}
            alt={`${project.name} 대표 이미지`}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 55vw"
            className={styles.banner}
          />
        </Link>
      </article>
    </section>
  );
}