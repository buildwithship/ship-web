import { ArrowRight } from 'lucide-react';

import ProjectCard from '@/components/project/ProjectCard';
import { Project } from '@/types/project';

interface ProjectSectionProps {
  id?: string;
  kicker?: string;
  title: string;
  description?: string;
  projects: Project[];
  showMore?: boolean;
}

export default function ProjectSection({
  id,
  kicker,
  title,
  description,
  projects,
  showMore = true,
}: ProjectSectionProps) {
  return (
    <section id={id} className="project-section">
      <div className="section-heading section-heading--row">
        <div>
          {kicker && (
            <span className="section-kicker">{kicker}</span>
          )}

          <h2>{title}</h2>

          {description && (
            <p className="section-description">
              {description}
            </p>
          )}
        </div>

        {showMore && (
          <a href="#" className="section-link">
            전체 보기
            <ArrowRight size={16} strokeWidth={2} />
          </a>
        )}
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}