import {
  ArrowRight,
  ArrowUp,
  Eye,
  Users,
} from 'lucide-react';

import PlatformLinks from '@/components/project/PlatformLinks';
import { Project } from '@/types/project';

interface FeaturedProjectProps {
  project: Project;
}

function formatCount(value: number) {
  if (value < 1000) {
    return value.toString();
  }

  return `${(value / 1000).toFixed(1).replace('.0', '')}K`;
}

export default function FeaturedProject({
  project,
}: FeaturedProjectProps) {
  return (
    <section className="featured-section">
      <div className="section-heading">
        <div>
          <span className="section-kicker">FEATURED</span>
          <h2>이번 주 주목할 프로젝트</h2>
        </div>
      </div>

      <article className="featured-project">
        <div className="featured-project__content">
          <div className="featured-project__top">
            <div className="featured-project__logo">
              {project.name.slice(0, 1)}
            </div>

            {project.recruiting && (
              <span className="crew-badge">
                <Users size={13} strokeWidth={2} />
                팀원 모집 중
              </span>
            )}
          </div>

          <div className="featured-project__copy">
            <p className="featured-project__maker">
              by {project.maker.name}
            </p>

            <h3>{project.name}</h3>

            <p className="featured-project__tagline">
              {project.tagline}
            </p>

            <p className="featured-project__description">
              {project.description}
            </p>
          </div>

          <div className="featured-project__tags">
            {project.categories.map((category) => (
              <span key={category} className="tag tag--brand">
                {category}
              </span>
            ))}
          </div>

          <div className="featured-project__footer">
            <a
              href={`#${project.slug}`}
              className="button button--primary"
            >
              프로젝트 보기
              <ArrowRight size={17} strokeWidth={2} />
            </a>

            <div className="featured-project__stats">
              <span>
                <ArrowUp size={16} />
                {formatCount(project.pushCount)}
              </span>

              <span>
                <Eye size={16} />
                {formatCount(project.viewCount)}
              </span>

              <PlatformLinks links={project.platforms} />
            </div>
          </div>
        </div>

        <div className="featured-project__visual">
          <div className="featured-browser">
            <div className="featured-browser__bar">
              <div className="browser-dots">
                <span />
                <span />
                <span />
              </div>

              <div className="browser-address">
                ship.build/{project.slug}
              </div>
            </div>

            <div className="featured-browser__body">
              <div className="featured-browser__nav">
                <div className="mock-logo" />
                <div className="mock-nav-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="featured-browser__hero">
                <div>
                  <span className="mock-label">
                    NOW SHIPPING
                  </span>
                  <strong>{project.name}</strong>
                  <div className="mock-copy-line mock-copy-line--wide" />
                  <div className="mock-copy-line" />
                  <div className="mock-button" />
                </div>

                <div className="featured-browser__phone">
                  <div className="phone-notch" />
                  <div className="phone-circle" />
                  <div className="phone-line phone-line--wide" />
                  <div className="phone-line" />
                  <div className="phone-card" />
                </div>
              </div>
            </div>
          </div>

          <div className="featured-wave featured-wave--one" />
          <div className="featured-wave featured-wave--two" />
        </div>
      </article>
    </section>
  );
}