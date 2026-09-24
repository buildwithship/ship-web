export type ApplicationStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export type CrewStatus =
  | 'none'
  | 'invited'
  | 'joined'
  | 'declined';

export interface ApplicationUser {
  name: string;
  username: string;
  avatarUrl: string;
}

export interface ProjectApplication {
  id: number;

  projectSlug: string;
  projectName: string;
  projectTagline: string;
  projectLogoUrl: string;

  role: string;

  message: string;
  portfolioUrl?: string;

  status: ApplicationStatus;
  crewStatus: CrewStatus;

  appliedAt: string;

  applicant: ApplicationUser;
  owner: ApplicationUser;
}