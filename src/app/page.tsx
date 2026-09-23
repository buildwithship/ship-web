import FeaturedProject from '@/components/home/FeaturedProject';
import HeroSection from '@/components/home/HeroSection';
import ProjectSection from '@/components/home/ProjectSection';

import {
  featuredProject,
  newProjects,
  recruitingProjects,
  trendingProjects,
} from '@/mocks/projects';

export default function Home() {
  return (
    <main>
      <div className="page-container">
        <HeroSection />

        <FeaturedProject project={featuredProject} />

        <ProjectSection
          id="projects"
          kicker="TRENDING"
          title="지금 많이 보는 프로젝트"
          description="최근 SHIP에서 가장 많은 관심을 받고 있는 프로젝트입니다."
          projects={trendingProjects}
        />

        <ProjectSection
          kicker="NEW SHIPS"
          title="새로 출항한 프로젝트"
          description="방금 세상 밖으로 나온 새로운 프로젝트를 먼저 발견해보세요."
          projects={newProjects}
        />

        <ProjectSection
          id="open-crew"
          kicker="OPEN FOR CREW"
          title="함께할 사람을 찾고 있어요"
          description="새로운 크루를 기다리고 있는 프로젝트입니다."
          projects={recruitingProjects}
          showMore={false}
        />
      </div>

      <footer className="site-footer">
        <div className="page-container site-footer__inner">
          <div>
            <strong>SHIP</strong>
            <p>Build. Ship. Connect.</p>
          </div>

          <span>Projects made by people.</span>
        </div>
      </footer>
    </main>
  );
}