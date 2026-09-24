'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Bell,
  ChevronDown,
  Home,
  LayoutGrid,
  Plus,
  UserRound,
  UserRoundSearch,
  Users,
} from 'lucide-react';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import AdBanner from '@/components/common/AdBanner';
import NotificationPanel from '@/components/notification/NotificationPanel';
import HeaderSearch from '@/components/search/HeaderSearch';

import {
  notifications as initialNotifications,
} from '@/mocks/notifications';

import { ShipNotification } from '@/types/notification';

import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

const navigation = [
  {
    label: '홈',
    href: '/',
    icon: Home,
  },
  {
    label: '프로젝트',
    href: '/projects',
    icon: LayoutGrid,
  },
  {
    label: '메이커',
    href: '/makers',
    icon: Users,
  },
  {
    label: '팀원 모집',
    href: '/recruiting',
    icon: UserRoundSearch,
  },
];

const adPages = [
  '/',
  '/projects',
  '/makers',
  '/recruiting',
];

function ShipMark() {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <path
        d="M21.6 5.2v18.1L9.7 20.7c2.7-6.9 6.6-12.1 11.9-15.5Z"
        fill="currentColor"
        opacity="0.55"
      />

      <path
        d="M24 8.6v14.9l10.5-2.2C32 15.8 28.5 11.6 24 8.6Z"
        fill="currentColor"
      />

      <path
        d="M8.3 25.2h27.4l-3.6 6.3H12l-3.7-6.3Z"
        fill="currentColor"
        opacity="0.84"
      />

      <path
        d="M9.5 35.3c2.7 1.5 5.3 1.5 8 0 2.7-1.5 5.3-1.5 8 0 2.7 1.5 5.3 1.5 8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getPageInfo(
  pathname: string,
) {
  if (pathname === '/') {
    return {
      title: '홈',
      description:
        '새로운 프로젝트를 발견해보세요.',
    };
  }

  if (pathname === '/projects') {
    return {
      title: '프로젝트',
      description:
        '만들어진 서비스를 둘러보세요.',
    };
  }

  if (
    pathname.startsWith(
      '/projects/new',
    )
  ) {
    return {
      title: '프로젝트 등록',
      description:
        '새로운 프로젝트를 등록하세요.',
    };
  }

  if (
    pathname.startsWith(
      '/projects/',
    )
  ) {
    return {
      title: '프로젝트 상세',
      description:
        '프로젝트 정보를 확인해보세요.',
    };
  }

  if (pathname === '/makers') {
    return {
      title: '메이커',
      description:
        '프로젝트를 만드는 사람들을 만나보세요.',
    };
  }

  if (
    pathname.startsWith(
      '/makers/',
    )
  ) {
    return {
      title: '메이커 프로필',
      description:
        '메이커의 프로젝트를 확인해보세요.',
    };
  }

  if (pathname === '/recruiting') {
    return {
      title: '팀원 모집',
      description:
        '함께할 프로젝트를 찾아보세요.',
    };
  }

  if (
    pathname.startsWith(
      '/applications',
    )
  ) {
    return {
      title: '지원 관리',
      description:
        '지원 현황을 확인하고 관리하세요.',
    };
  }

  return {
    title: 'SHIP',
    description:
      '프로젝트와 메이커를 연결합니다.',
  };
}

export default function AppShell({
  children,
}: AppShellProps) {
  const pathname = usePathname();

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState<
    ShipNotification[]
  >(initialNotifications);

  const profileRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const notificationRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const pageInfo =
    getPageInfo(pathname);

  const showAd =
    adPages.includes(pathname);

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read,
    ).length;

  const isActive = (
    href: string,
  ) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(
      href,
    );
  };

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(
          target,
        )
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          target,
        )
      ) {
        setNotificationOpen(
          false,
        );
      }
    };

    window.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () => {
      window.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setNotificationOpen(false);
  }, [pathname]);

  const handleReadNotification = (
    id: number,
  ) => {
    setNotifications(
      (prev) =>
        prev.map(
          (notification) =>
            notification.id === id
              ? {
                  ...notification,
                  read: true,
                }
              : notification,
        ),
    );
  };

  const handleReadAll = () => {
    setNotifications(
      (prev) =>
        prev.map(
          (notification) => ({
            ...notification,
            read: true,
          }),
        ),
    );
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link
          href="/"
          className={styles.brand}
        >
          <span className={styles.logo}>
            <ShipMark />
          </span>

          <strong>
            SHIP
          </strong>
        </Link>

        <nav
          className={
            styles.navigation
          }
        >
          {navigation.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive(
                      item.href,
                    )
                      ? styles.active
                      : undefined
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={2}
                  />

                  <span>
                    {item.label}
                  </span>
                </Link>
              );
            },
          )}
        </nav>

        <div
          className={
            styles.sidebarBottom
          }
        >
          <Link
            href="/projects/new"
            className={
              styles.shipButton
            }
          >
            <Plus
              size={18}
              strokeWidth={2.2}
            />

            프로젝트 올리기
          </Link>
        </div>
      </aside>

      <div
        className={styles.workspace}
      >
        <header
          className={styles.topbar}
        >
          <div
            className={
              styles.topbarInner
            }
          >
            <div
              className={
                styles.pageIdentity
              }
            >
              <div
                className={
                  styles.mobileBrand
                }
              >
                <Link href="/">
                  <span
                    className={
                      styles.logo
                    }
                  >
                    <ShipMark />
                  </span>

                  <strong>
                    SHIP
                  </strong>
                </Link>
              </div>

              <div
                className={
                  styles.pageText
                }
              >
                <strong>
                  {pageInfo.title}
                </strong>

                <span>
                  {
                    pageInfo.description
                  }
                </span>
              </div>
            </div>

            <HeaderSearch />

            <div
              className={
                styles.topbarActions
              }
            >
              <Link
                href="/applications"
                className={
                  styles.applicationButton
                }
              >
                <UserRoundSearch
                  size={17}
                  strokeWidth={2}
                />

                <span>
                  지원 관리
                </span>
              </Link>

              <div
                ref={notificationRef}
                className={
                  styles.notificationWrap
                }
              >
                <button
                  type="button"
                  className={
                    styles.notificationButton
                  }
                  aria-label="알림"
                  aria-expanded={
                    notificationOpen
                  }
                  onClick={() => {
                    setNotificationOpen(
                      (prev) =>
                        !prev,
                    );

                    setProfileOpen(
                      false,
                    );
                  }}
                >
                  <Bell
                    size={20}
                    strokeWidth={2}
                  />

                  {unreadCount > 0 && (
                    <span
                      className={
                        styles.notificationBadge
                      }
                    >
                      {unreadCount > 9
                        ? '9+'
                        : unreadCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <NotificationPanel
                    notifications={
                      notifications
                    }
                    onRead={
                      handleReadNotification
                    }
                    onReadAll={
                      handleReadAll
                    }
                    onClose={() =>
                      setNotificationOpen(
                        false,
                      )
                    }
                  />
                )}
              </div>

              <div
                ref={profileRef}
                className={
                  styles.profileWrap
                }
              >
                <button
                  type="button"
                  className={
                    styles.profileButton
                  }
                  onClick={() => {
                    setProfileOpen(
                      (prev) =>
                        !prev,
                    );

                    setNotificationOpen(
                      false,
                    );
                  }}
                  aria-expanded={
                    profileOpen
                  }
                >
                  <Image
                    src="/images/makers/uptomaster.jpg"
                    alt="이남혁 프로필"
                    width={36}
                    height={36}
                    className={
                      styles.profileImage
                    }
                  />

                  <span
                    className={
                      styles.profileText
                    }
                  >
                    <strong>
                      이남혁
                    </strong>

                    <small>
                      @uptomaster
                    </small>
                  </span>

                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    className={
                      profileOpen
                        ? styles.chevronOpen
                        : undefined
                    }
                  />
                </button>

                {profileOpen && (
                  <div
                    className={
                      styles.profileMenu
                    }
                  >
                    <div
                      className={
                        styles.profileMenuHeader
                      }
                    >
                      <Image
                        src="/images/makers/uptomaster.jpg"
                        alt="이남혁"
                        width={42}
                        height={42}
                      />

                      <div>
                        <strong>
                          이남혁
                        </strong>

                        <span>
                          @uptomaster
                        </span>
                      </div>
                    </div>

                    <div
                      className={
                        styles.profileMenuDivider
                      }
                    />

                    <Link
                      href="/makers/uptomaster"
                    >
                      <UserRound
                        size={17}
                      />

                      내 프로필
                    </Link>

                    <Link
                      href="/applications"
                    >
                      <UserRoundSearch
                        size={17}
                      />

                      지원 관리
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/projects/new"
                className={
                  styles.mobileUpload
                }
                aria-label="프로젝트 올리기"
              >
                <Plus
                  size={18}
                />
              </Link>
            </div>
          </div>

          <nav
            className={
              styles.mobileNavigation
            }
          >
            {navigation.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive(
                      item.href,
                    )
                      ? styles.mobileActive
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </header>

        <div className={styles.main}>
          <div
            className={
              styles.content
            }
          >
            {showAd && (
              <AdBanner />
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}