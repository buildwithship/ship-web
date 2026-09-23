export type ProjectPlatform = 'web' | 'appStore' | 'googlePlay';

export interface ProjectLink {
  platform: ProjectPlatform;
  url: string;
}

export interface ProjectMaker {
  name: string;
  username: string;
}

export type ProjectVisualVariant =
  | 'ocean'
  | 'sky'
  | 'deep'
  | 'wave'
  | 'mist'
  | 'harbor';

export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: string[];
  maker: ProjectMaker;
  pushCount: number;
  viewCount: number;
  recruiting: boolean;
  platforms: ProjectLink[];
  visualVariant: ProjectVisualVariant;
  featured?: boolean;
}