export interface Maker {
  username: string;
  name: string;
  role: string;
  bio: string;

  avatarUrl: string;

  subscriberCount: number;
  projectCount: number;

  openToProject: boolean;

  skills: string[];

  githubUrl?: string;
  websiteUrl?: string;
}