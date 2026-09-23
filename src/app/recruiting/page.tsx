import ProjectSection from '@/components/home/ProjectSection';

import { recruitingProjects } from '@/mocks/projects';

export default function RecruitingPage() {
  return (
    <main className="content-page">
      <header className="page-heading-block">
        <span>팀원 모집</span>

        <h1>함께 만들 사람을 찾고 있어요</h1>

        <p>
          지금 새로운 팀원을 찾고 있는
          프로젝트를 확인해보세요.
        </p>
      </header>

      <div className="filter-row">
        <button className="filter-active">
          전체
        </button>

        <button>Frontend</button>
        <button>Backend</button>
        <button>Design</button>
        <button>PM</button>
      </div>

      <ProjectSection
        title="모집 중인 프로젝트"
        projects={recruitingProjects}
        showMore={false}
      />
    </main>
  );
}