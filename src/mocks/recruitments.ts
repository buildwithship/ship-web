import { Recruitment } from '@/types/recruitment';

export const recruitments: Recruitment[] = [
  {
    id: 1,

    projectSlug: 'pair',
    projectName: 'PAIR',
    projectTagline:
      '대화를 더 잘 풀어가는 관계 중재 서비스',

    projectLogoUrl:
      '/images/projects/pair-logo.jpg',

    projectBannerUrl:
      '/images/projects/pair-banner.jpg',

    makerName: '이남혁',
    makerUsername: 'uptomaster',
    makerAvatarUrl:
      '/images/makers/uptomaster.jpg',

    positions: [
      {
        role: 'Backend',
        count: 1,
      },
      {
        role: 'Design',
        count: 1,
      },
    ],

    type: 'ongoing',

    teamSize: 3,

    shortDescription:
      'PAIR를 함께 개선하고 출시까지 같이 갈 팀원을 찾고 있어요.',

    createdAt: '2일 전',
  },

  {
    id: 2,

    projectSlug: 'ddaom',
    projectName: '따옴',
    projectTagline:
      '이웃과 농산물을 나누는 새로운 방법',

    projectLogoUrl:
      '/images/projects/ddaom-logo.jpg',

    projectBannerUrl:
      '/images/projects/ddaom-banner.jpg',

    makerName: 'Team DDAOM',
    makerUsername: 'ddaom',
    makerAvatarUrl:
      '/images/makers/ddaom.jpg',

    positions: [
      {
        role: 'Frontend',
        count: 1,
      },
      {
        role: 'Design',
        count: 1,
      },
      {
        role: 'PM',
        count: 1,
      },
    ],

    type: 'ongoing',

    teamSize: 4,

    shortDescription:
      '지역 기반 교류 서비스를 같이 만들어갈 팀원을 모집하고 있어요.',

    createdAt: '4일 전',
  },

  {
    id: 3,

    projectSlug: 'sangil',
    projectName: '산길',
    projectTagline:
      '내게 맞는 산을 발견하는 가장 쉬운 방법',

    projectLogoUrl:
      '/images/projects/sangil-logo.jpg',

    projectBannerUrl:
      '/images/projects/sangil-banner.jpg',

    makerName: '이남혁',
    makerUsername: 'uptomaster',
    makerAvatarUrl:
      '/images/makers/uptomaster.jpg',

    positions: [
      {
        role: 'iOS',
        count: 1,
      },
    ],

    type: 'closingSoon',

    teamSize: 1,

    shortDescription:
      'SwiftUI 기반 iOS 앱을 같이 다듬고 출시할 팀원을 찾습니다.',

    createdAt: '6일 전',
  },
];