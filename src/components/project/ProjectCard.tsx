'use client';

import { useState } from 'react';
import { ArrowUp, Eye, Users } from 'lucide-react';

import PlatformLinks from './PlatformLinks';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

function formatCount(value: number) {
  if (value < 1000) {
    return value.toString();
  }

  const formatted = (value / 1000).toFixed(1);

  return `${formatted.replace('.0', '')}K`;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const [isPushed, setIsPushed] = useState(false);

  const currentPushCount =
    project.pushCount + (isPushed ? 1 : 0);

  return (
    <article className="project-card">
      <a
        href={`#${project.slug}`}
        className={`project-card__visual project-card__visual--${project.visualVariant}`}
        aria-label={`${project.name} 프로젝트 보기`}
      >
        <div className="project-preview">
          <div className="project-preview__topbar">
            <span />
            <span />
            <span />
          </div>

          <div className="project-preview__content">
            <div className="project-preview__eyebrow">
              SHIPPED PROJECT
            </div>

            <strong>{project.name}</strong>

            <div className="project-preview__line project-preview__line--large" />
            <div className="project-preview__line" />
            <div className="project-preview__line project-preview__line--short" />
          </div>
        </div>

        {project.recruiting && (
          <div className="project-card__recruiting">
            <Users size={13} strokeWidth={2} />
            팀원 모집 중
          </div>
        )}
      </a>

      <div className="project-card__body">
        <div className="project-card__heading">
          <div className="project-card__identity">
            <div className="project-logo">
              {project.name.slice(0, 1)}
            </div>

            <div>
              <a
                href={`#${project.slug}`}
                className="project-card__name"
              >
                {project.name}
              </a>

              <p className="project-card__tagline">
                {project.tagline}
              </p>
            </div>
          </div>
        </div>

        <div className="project-card__tags">
          {project.categories.map((category) => (
            <span key={category} className="tag">
              {category}
            </span>
          ))}
        </div>

        <div className="project-card__meta">
          <div className="project-card__stats">
            <button
              type="button"
              className={`push-button ${
                isPushed ? 'push-button--active' : ''
              }`}
              onClick={() => setIsPushed((prev) => !prev)}
              aria-pressed={isPushed}
            >
              <ArrowUp size={16} strokeWidth={2.2} />
              <span>{formatCount(currentPushCount)}</span>
            </button>

            <div className="project-stat">
              <Eye size={16} strokeWidth={1.8} />
              <span>{formatCount(project.viewCount)}</span>
            </div>
          </div>

          <PlatformLinks links={project.platforms} />
        </div>

        <a
          href={`#maker-${project.maker.username}`}
          className="project-card__maker"
        >
          by {project.maker.name}
        </a>
      </div>
    </article>
  );
}