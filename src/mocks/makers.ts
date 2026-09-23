import { Maker } from '@/types/maker';

export const makers: Maker[] = [
  {
    username: 'uptomaster',
    name: '이남혁',
    role: 'Frontend / Product Maker',
    bio: '웹과 앱 서비스를 직접 만들고 출시하고 있습니다.',
    avatarUrl: '/images/makers/uptomaster.jpg',
    subscriberCount: 238,
    projectCount: 3,
    openToProject: true,
    skills: [
      'Frontend',
      'React',
      'iOS',
      'PM',
    ],
    githubUrl: 'https://github.com/uptomaster',
  },
  {
    username: 'noddi',
    name: 'Team Noddi',
    role: 'Product Team',
    bio: '팀의 대화와 협업을 더 잘 연결하는 제품을 만듭니다.',
    avatarUrl: '/images/makers/noddi.jpg',
    subscriberCount: 146,
    projectCount: 1,
    openToProject: false,
    skills: [
      'AI',
      'Frontend',
      'Backend',
    ],
  },
  {
    username: 'halo',
    name: 'Team HALO',
    role: 'Product Team',
    bio: '가족과 함께 보내는 시간을 더 오래 남기는 서비스를 만듭니다.',
    avatarUrl: '/images/makers/halo.jpg',
    subscriberCount: 121,
    projectCount: 1,
    openToProject: false,
    skills: [
      'Android',
      'Spring',
      'Design',
    ],
  },
  {
    username: 'ddaom',
    name: 'Team DDAOM',
    role: 'Product Team',
    bio: '사람과 지역을 연결하는 새로운 서비스를 만들고 있습니다.',
    avatarUrl: '/images/makers/ddaom.jpg',
    subscriberCount: 83,
    projectCount: 1,
    openToProject: true,
    skills: [
      'Community',
      'Web',
      'Product',
    ],
  },
  {
    username: 'moment',
    name: 'Studio Moment',
    role: 'Indie Maker',
    bio: '일상의 작은 순간을 기록하는 제품을 만듭니다.',
    avatarUrl: '/images/makers/moment.jpg',
    subscriberCount: 72,
    projectCount: 1,
    openToProject: true,
    skills: [
      'Design',
      'iOS',
    ],
  },
];

export function getMakerByUsername(
  username: string,
): Maker | undefined {
  return makers.find(
    (maker: Maker) =>
      maker.username === username,
  );
}