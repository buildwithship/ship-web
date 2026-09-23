'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Bell,
  Home,
  LayoutGrid,
  Plus,
  Search,
  UserRoundSearch,
  Users,
} from 'lucide-react';

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

export default function AppShell({
  children,
}: AppShellProps) {
  const pathname = usePathname();

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

        <nav className={styles.navigation}>
          {navigation.map((item) => {
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

                {item.label}
              </Link>
            );
          })}
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
            <Plus size={18} />
            프로젝트 올리기
          </Link>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.topbar}>
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
              styles.topbarActions
            }
          >
            <button
              type="button"
              className={
                styles.iconButton
              }
              aria-label="검색"
            >
              <Search
                size={20}
              />
            </button>

            <button
              type="button"
              className={
                styles.iconButton
              }
              aria-label="알림"
            >
              <Bell
                size={20}
              />
            </button>

            <Link
              href="/makers/uptomaster"
              className={
                styles.profile
              }
            >
              <Image
                src="/images/makers/uptomaster.jpg"
                alt="내 프로필"
                width={34}
                height={34}
              />
            </Link>

            <Link
              href="/projects/new"
              className={
                styles.mobileUpload
              }
            >
              <Plus
                size={17}
              />
              올리기
            </Link>
          </div>

          <nav
            className={
              styles.mobileNavigation
            }
          >
            {navigation.map(
              (item) => (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className={
                    isActive(
                      item.href,
                    )
                      ? styles.mobileActive
                      : undefined
                  }
                >
                  {
                    item.label
                  }
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