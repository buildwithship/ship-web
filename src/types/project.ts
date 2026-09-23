export type ProjectPlatform =
  | 'web'
  | 'appStore'
  | 'googlePlay';

export type ProjectStatus =
  | 'operating'
  | 'inProgress'
  | 'ended';

export interface ProjectLink {
  platform: ProjectPlatform;
  url: string;
}

export interface ProjectMaker {
  name: string;
  username: string;
  avatarUrl: string;
}

export interface Project {
  id: number;
  slug: string;

  name: string;
  tagline: string;
  description: string;

  logoUrl: string;
  bannerUrl: string;

  galleryUrls?: string[];

  categories: string[];

  maker: ProjectMaker;

  pushCount: number;
  viewCount: number;
  teamSize: number;

  status: ProjectStatus;

  recruiting: boolean;
  spotlight?: boolean;

  platforms: ProjectLink[];
}