export type RecruitmentRole =
  | 'Frontend'
  | 'Backend'
  | 'iOS'
  | 'Android'
  | 'Design'
  | 'PM';

export type RecruitmentType =
  | 'ongoing'
  | 'closingSoon';

export interface RecruitmentPosition {
  role: RecruitmentRole;
  count: number;
}

export interface Recruitment {
  id: number;

  projectSlug: string;
  projectName: string;
  projectTagline: string;

  projectLogoUrl: string;
  projectBannerUrl: string;

  makerName: string;
  makerUsername: string;
  makerAvatarUrl: string;

  positions: RecruitmentPosition[];

  type: RecruitmentType;

  teamSize: number;

  shortDescription: string;

  createdAt: string;
}