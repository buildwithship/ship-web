import { ShipNotification } from '@/types/notification';

export const notifications: ShipNotification[] = [
  {
    id: 1,
    type: 'application_received',

    title: 'PAIR에 새로운 지원이 도착했어요',
    message:
      '김민수님이 Backend 포지션에 지원했습니다.',

    href: '/applications',

    imageUrl:
      '/images/projects/pair-logo.jpg',

    createdAt: '방금 전',

    read: false,
  },

  {
    id: 2,
    type: 'application_received',

    title: '새로운 지원이 도착했어요',
    message:
      '박서연님이 PAIR의 Design 포지션에 지원했습니다.',

    href: '/applications',

    imageUrl:
      '/images/projects/pair-logo.jpg',

    createdAt: '12분 전',

    read: false,
  },

  {
    id: 3,
    type: 'crew_invite',

    title: 'CREW 합류 요청이 도착했어요',
    message:
      'Noddi 팀에서 Frontend CREW 합류를 요청했습니다.',

    href: '/applications',

    imageUrl:
      '/images/projects/noddi-logo.jpg',

    createdAt: '1시간 전',

    read: false,
  },

  {
    id: 4,
    type: 'application_accepted',

    title: '지원이 수락됐어요',
    message:
      'Moment 프로젝트에서 지원을 수락했습니다.',

    href: '/applications',

    imageUrl:
      '/images/projects/moment-logo.jpg',

    createdAt: '어제',

    read: true,
  },

  {
    id: 5,
    type: 'project_invite',

    title: '프로젝트 초대가 도착했어요',
    message:
      '새로운 프로젝트의 CREW로 초대되었습니다.',

    href: '/applications',

    imageUrl:
      '/images/projects/ddaom-logo.jpg',

    createdAt: '2일 전',

    read: true,
  },
];