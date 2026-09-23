import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'pair',
    name: 'PAIR',
    tagline: '대화를 더 잘 풀어가는 관계 중재 서비스',
    description:
      '두 사람의 대화를 바탕으로 서로의 입장을 정리하고 관계를 풀어갈 수 있도록 돕는 서비스입니다.',
    logoUrl: '/images/projects/pair-logo.jpg',
    bannerUrl: '/images/projects/pair-banner.jpg',
    categories: ['AI', 'Lifestyle'],
    maker: {
      name: '이남혁',
      username: 'uptomaster',
    },
    pushCount: 328,
    viewCount: 4821,
    teamSize: 3,
    recruiting: true,
    spotlight: true,
    platforms: [
      {
        platform: 'web',
        url: 'https://example.com',
      },
      {
        platform: 'appStore',
        url: 'https://www.apple.com/app-store/',
      },
      {
        platform: 'googlePlay',
        url: 'https://play.google.com/store',
      },
    ],
  },
  {
    id: 2,
    slug: 'noddi',
    name: 'Noddi',
    tagline: '팀의 대화를 더 잘 연결하는 AI 협업 공간',
    description:
      '회의와 팀 대화를 한곳에 모으고 필요한 정보를 빠르게 찾을 수 있는 협업 서비스입니다.',
    logoUrl: '/images/projects/noddi-logo.jpg',
    bannerUrl: '/images/projects/noddi-banner.jpg',
    categories: ['Productivity', 'AI'],
    maker: {
      name: 'Team Noddi',
      username: 'noddi',
    },
    pushCount: 241,
    viewCount: 3150,
    teamSize: 5,
    recruiting: false,
    platforms: [
      {
        platform: 'web',
        url: 'https://example.com',
      },
    ],
  },
  {
    id: 3,
    slug: 'halo',
    name: 'HALO',
    tagline: '가족의 하루를 한 장씩 기록하는 공간',
    description:
      '가족과 함께 사진과 감정을 남기며 일상의 순간을 기록하는 서비스입니다.',
    logoUrl: '/images/projects/halo-logo.jpg',
    bannerUrl: '/images/projects/halo-banner.jpg',
    categories: ['Family', 'Record'],
    maker: {
      name: 'Team HALO',
      username: 'halo',
    },
    pushCount: 198,
    viewCount: 2780,
    teamSize: 6,
    recruiting: false,
    platforms: [
      {
        platform: 'googlePlay',
        url: 'https://play.google.com/store',
      },
    ],
  },
  {
    id: 4,
    slug: 'ddaom',
    name: '따옴',
    tagline: '이웃과 농산물을 나누는 새로운 방법',
    description:
      '취미 농사에서 생긴 농산물을 가까운 이웃과 나누고 교류할 수 있는 서비스입니다.',
    logoUrl: '/images/projects/ddaom-logo.jpg',
    bannerUrl: '/images/projects/ddaom-banner.jpg',
    categories: ['Local', 'Community'],
    maker: {
      name: 'Team DDAOM',
      username: 'ddaom',
    },
    pushCount: 164,
    viewCount: 1960,
    teamSize: 4,
    recruiting: true,
    platforms: [
      {
        platform: 'web',
        url: 'https://example.com',
      },
    ],
  },
  {
    id: 5,
    slug: 'sangil',
    name: '산길',
    tagline: '내게 맞는 산을 발견하는 가장 쉬운 방법',
    description:
      '한국의 산을 난이도와 특징으로 탐색하고 나에게 맞는 등산 코스를 발견하는 앱입니다.',
    logoUrl: '/images/projects/sangil-logo.jpg',
    bannerUrl: '/images/projects/sangil-banner.jpg',
    categories: ['Outdoor', 'iOS'],
    maker: {
      name: '이남혁',
      username: 'uptomaster',
    },
    pushCount: 137,
    viewCount: 1420,
    teamSize: 1,
    recruiting: false,
    platforms: [
      {
        platform: 'appStore',
        url: 'https://www.apple.com/app-store/',
      },
    ],
  },
  {
    id: 6,
    slug: 'moment',
    name: 'Moment',
    tagline: '작은 순간을 오래 남기는 기록 서비스',
    description:
      '하루의 의미 있는 순간을 사진 한 장과 짧은 문장으로 남기는 서비스입니다.',
    logoUrl: '/images/projects/moment-logo.jpg',
    bannerUrl: '/images/projects/moment-banner.jpg',
    categories: ['Record', 'Lifestyle'],
    maker: {
      name: 'Studio Moment',
      username: 'moment',
    },
    pushCount: 124,
    viewCount: 1280,
    teamSize: 2,
    recruiting: false,
    platforms: [
      {
        platform: 'web',
        url: 'https://example.com',
      },
      {
        platform: 'appStore',
        url: 'https://www.apple.com/app-store/',
      },
    ],
  },
];

export const spotlightProject =
  projects.find((project) => project.spotlight) ?? projects[0];

export const trendingProjects = projects.slice(0, 6);

export const newProjects = [...projects].reverse().slice(0, 6);

export const recruitingProjects = projects.filter(
  (project) => project.recruiting,
);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}