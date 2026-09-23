export type ProjectPlatform = 'web' | 'appStore' | 'googlePlay';

export interface ProjectLink {
  platform: ProjectPlatform;
  url: string;
}

export interface ProjectMaker {
  name: string;
  username: string;
}

export interface Project {
  id: number;
  slug: string;

  name: string;
  tagline: string;
  description: string;

  logoUrl: string;
  bannerUrl: string;

  categories: string[];

  maker: ProjectMaker;

  pushCount: number;
  viewCount: number;
  teamSize: number;

  recruiting: boolean;
  spotlight?: boolean;

  platforms: ProjectLink[];
}