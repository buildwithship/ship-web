import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'pair',
    name: 'PAIR',
    tagline: '대화를 더 잘 풀어가는 관계 중재 서비스',
    description:
      '두 사람의 대화를 바탕으로 서로의 입장을 정리하고 관계를 풀어갈 수 있도록 돕는 서비스입니다.',
    categories: ['AI', 'Lifestyle'],
    maker: {
      name: '이남혁',
      username: 'uptomaster',
    },
    pushCount: 328,
    viewCount: 4821,
    recruiting: true,
    visualVariant: 'ocean',
    featured: true,
    platforms: [
      {
        platform: 'web',
        url: '#',
      },
      {
        platform: 'appStore',
        url: '#',
      },
      {
        platform: 'googlePlay',
        url: '#',
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
    categories: ['Productivity', 'AI'],
    maker: {
      name: 'Team Noddi',
      username: 'noddi',
    },
    pushCount: 241,
    viewCount: 3150,
    recruiting: false,
    visualVariant: 'sky',
    platforms: [
      {
        platform: 'web',
        url: '#',
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
    categories: ['Family', 'Record'],
    maker: {
      name: 'Team HALO',
      username: 'halo',
    },
    pushCount: 198,
    viewCount: 2780,
    recruiting: false,
    visualVariant: 'mist',
    platforms: [
      {
        platform: 'googlePlay',
        url: '#',
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
    categories: ['Local', 'Community'],
    maker: {
      name: 'Team DDAOM',
      username: 'ddaom',
    },
    pushCount: 164,
    viewCount: 1960,
    recruiting: true,
    visualVariant: 'harbor',
    platforms: [
      {
        platform: 'web',
        url: '#',
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
    categories: ['Outdoor', 'iOS'],
    maker: {
      name: '이남혁',
      username: 'uptomaster',
    },
    pushCount: 137,
    viewCount: 1420,
    recruiting: false,
    visualVariant: 'deep',
    platforms: [
      {
        platform: 'appStore',
        url: '#',
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
    categories: ['Record', 'Lifestyle'],
    maker: {
      name: 'Studio Moment',
      username: 'moment',
    },
    pushCount: 124,
    viewCount: 1280,
    recruiting: false,
    visualVariant: 'wave',
    platforms: [
      {
        platform: 'web',
        url: '#',
      },
      {
        platform: 'appStore',
        url: '#',
      },
    ],
  },
];

export const featuredProject =
  projects.find((project) => project.featured) ?? projects[0];

export const trendingProjects = projects.slice(0, 6);

export const newProjects = [...projects].reverse().slice(0, 6);

export const recruitingProjects = projects.filter(
  (project) => project.recruiting,
);