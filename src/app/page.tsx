import HeroSection from '@/components/home/HeroSection';
import HomeDiscovery from '@/components/home/HomeDiscovery';
import SpotlightProject from '@/components/home/SpotlightProject';

import {
  spotlightProject,
} from '@/mocks/projects';

export default function Home() {
  return (
    <main>
      <HeroSection />

      <SpotlightProject
        project={spotlightProject}
      />

      <HomeDiscovery />
    </main>
  );
}