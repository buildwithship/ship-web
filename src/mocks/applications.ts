import { ProjectApplication } from '@/types/application';

const currentUser = {
  name: '이남혁',
  username: 'uptomaster',
  avatarUrl:
    '/images/makers/uptomaster.jpg',
};

export const sentApplications: ProjectApplication[] = [
  {
    id: 1,

    projectSlug: 'moment',
    projectName: 'Moment',
    projectTagline:
      '작은 순간을 오래 남기는 기록 서비스',
    projectLogoUrl:
      '/images/projects/moment-logo.jpg',

    role: 'Frontend',

    message:
      'React 기반 프로젝트 경험이 있고, 서비스의 기록 경험을 더 다듬는 작업에 관심이 있어 지원했습니다.',

    portfolioUrl:
      'https://github.com/uptomaster',

    status: 'pending',
    crewStatus: 'none',

    appliedAt: '2026.09.23',

    applicant: currentUser,

    owner: {
      name: 'Studio Moment',
      username: 'moment',
      avatarUrl:
        '/images/makers/moment.jpg',
    },
  },

  {
    id: 2,

    projectSlug: 'noddi',
    projectName: 'Noddi',
    projectTagline:
      '팀의 대화를 더 잘 연결하는 AI 협업 공간',
    projectLogoUrl:
      '/images/projects/noddi-logo.jpg',

    role: 'Frontend',

    message:
      'React와 TypeScript 기반 웹 프로젝트 경험을 바탕으로 프론트엔드 개발에 참여하고 싶습니다.',

    portfolioUrl:
      'https://github.com/uptomaster',

    status: 'accepted',
    crewStatus: 'invited',

    appliedAt: '2026.09.20',

    applicant: currentUser,

    owner: {
      name: 'Team Noddi',
      username: 'noddi',
      avatarUrl:
        '/images/makers/noddi.jpg',
    },
  },

  {
    id: 3,

    projectSlug: 'halo',
    projectName: 'HALO',
    projectTagline:
      '가족의 하루를 한 장씩 기록하는 공간',
    projectLogoUrl:
      '/images/projects/halo-logo.jpg',

    role: 'iOS',

    message:
      'SwiftUI를 공부하면서 실제 서비스 개발 경험을 쌓고 싶어 지원했습니다.',

    status: 'rejected',
    crewStatus: 'none',

    appliedAt: '2026.09.14',

    applicant: currentUser,

    owner: {
      name: 'Team HALO',
      username: 'halo',
      avatarUrl:
        '/images/makers/halo.jpg',
    },
  },
];

export const receivedApplications: ProjectApplication[] = [
  {
    id: 101,

    projectSlug: 'pair',
    projectName: 'PAIR',
    projectTagline:
      '대화를 더 잘 풀어가는 관계 중재 서비스',
    projectLogoUrl:
      '/images/projects/pair-logo.jpg',

    role: 'Backend',

    message:
      'NestJS와 PostgreSQL을 사용한 프로젝트 경험이 있습니다. 중재 데이터와 대화 기록 구조 설계에 참여하고 싶습니다.',

    portfolioUrl:
      'https://github.com/example-backend',

    status: 'pending',
    crewStatus: 'none',

    appliedAt: '2026.09.24',

    applicant: {
      name: '김민수',
      username: 'minsu-dev',
      avatarUrl:
        '/images/makers/noddi.jpg',
    },

    owner: currentUser,
  },

  {
    id: 102,

    projectSlug: 'pair',
    projectName: 'PAIR',
    projectTagline:
      '대화를 더 잘 풀어가는 관계 중재 서비스',
    projectLogoUrl:
      '/images/projects/pair-logo.jpg',

    role: 'Design',

    message:
      '모바일 서비스 UX/UI 작업 경험이 있고, PAIR의 감정 중재 화면을 더 자연스럽게 만드는 데 관심이 있습니다.',

    portfolioUrl:
      'https://example.com',

    status: 'pending',
    crewStatus: 'none',

    appliedAt: '2026.09.24',

    applicant: {
      name: '박서연',
      username: 'seoyeon',
      avatarUrl:
        '/images/makers/moment.jpg',
    },

    owner: currentUser,
  },

  {
    id: 103,

    projectSlug: 'ddaom',
    projectName: '따옴',
    projectTagline:
      '이웃과 농산물을 나누는 새로운 방법',
    projectLogoUrl:
      '/images/projects/ddaom-logo.jpg',

    role: 'Frontend',

    message:
      'React Native와 Expo를 사용한 경험이 있습니다. 모바일 화면 구현과 상태 관리 작업을 맡고 싶습니다.',

    portfolioUrl:
      'https://github.com/example-frontend',

    status: 'accepted',
    crewStatus: 'invited',

    appliedAt: '2026.09.21',

    applicant: {
      name: '최지훈',
      username: 'jihoon',
      avatarUrl:
        '/images/makers/ddaom.jpg',
    },

    owner: currentUser,
  },
];