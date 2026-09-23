'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Home,
  LayoutGrid,
  LogOut,
  Plus,
  Search,
  Settings,
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
import RightUtilityRail from '@/components/layout/RightUtilityRail';

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

function getPageInfo(pathname: string) {
  if (pathname === '/') {
    return {
      title: '홈',
      description: '새로운 프로젝트를 발견해보세요.',
    };
  }

  if (pathname === '/projects') {
    return {
      title: '프로젝트',
      description: '만들어진 서비스를 둘러보세요.',
    };
  }

  if (pathname.startsWith('/projects/new')) {
    return {
      title: '프로젝트 등록',
      description: '새로운 프로젝트를 SHIP에 올려보세요.',
    };
  }

  if (pathname.startsWith('/projects/')) {
    return {
      title: '프로젝트 상세',
      description: '프로젝트의 이야기를 확인해보세요.',
    };
  }

  if (pathname === '/makers') {
    return {
      title: '메이커',
      description: '만드는 사람들을 만나보세요.',
    };
  }

  if (pathname.startsWith('/makers/')) {
    return {
      title: '메이커 프로필',
      description: '메이커의 프로젝트와 활동을 확인해보세요.',
    };
  }

  if (pathname === '/recruiting') {
    return {
      title: '팀원 모집',
      description: '함께 만들 프로젝트를 찾아보세요.',
    };
  }

  if (pathname.startsWith('/applications')) {
    return {
      title: '지원 관리',
      description: '지원 현황과 받은 지원을 관리하세요.',
    };
  }

  if (pathname === '/feedback') {
    return {
      title: '건의함',
      description: 'SHIP에 의견을 보내주세요.',
    };
  }

  return {
    title: 'SHIP',
    description: '프로젝트와 메이커를 연결합니다.',
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

  const profileRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const pageInfo =
    getPageInfo(pathname);

  const showAd =
    adPages.includes(pathname);

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
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node,
        )
      ) {
        setProfileOpen(false);
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
  }, [pathname]);

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
        className={
          styles.workspace
        }
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

            <label
              className={
                styles.searchBar
              }
            >
              <Search
                size={17}
                strokeWidth={2}
              />

              <input
                type="search"
                placeholder="프로젝트, 메이커 검색"
                aria-label="통합 검색"
              />

              <kbd>⌘ K</kbd>
            </label>

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

              <button
                type="button"
                className={
                  styles.notificationButton
                }
                aria-label="알림"
              >
                <Bell
                  size={20}
                  strokeWidth={2}
                />

                <span
                  className={
                    styles.notificationBadge
                  }
                >
                  3
                </span>
              </button>

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
                  onClick={() =>
                    setProfileOpen(
                      (prev) =>
                        !prev,
                    )
                  }
                  aria-expanded={
                    profileOpen
                  }
                  aria-label="프로필 메뉴"
                >
                  <Image
                    src="/images/makers/uptomaster.jpg"
                    alt="이남혁 프로필"
                    width={38}
                    height={38}
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
                    size={16}
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
                        alt="이남혁 프로필"
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

                    <Link
                      href="/feedback"
                    >
                      <CircleHelp
                        size={17}
                      />

                      건의함
                    </Link>

                    <Link
                      href="/settings"
                    >
                      <Settings
                        size={17}
                      />

                      설정
                    </Link>

                    <div
                      className={
                        styles.profileMenuDivider
                      }
                    />

                    <button
                      type="button"
                      className={
                        styles.logoutButton
                      }
                    >
                      <LogOut
                        size={17}
                      />

                      로그아웃
                    </button>
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
                  strokeWidth={2.2}
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

      <RightUtilityRail />
    </div>
  );
}