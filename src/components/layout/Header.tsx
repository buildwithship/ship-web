import Link from 'next/link';
import {
  Bell,
  Plus,
  Search,
} from 'lucide-react';

function ShipLogo() {
  return (
    <div className="ship-logo-mark" aria-hidden="true">
      <svg viewBox="0 0 44 44">
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
    </div>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          <ShipLogo />
          <span className="brand__name">SHIP</span>
        </Link>

        <nav className="main-nav" aria-label="주요 메뉴">
          <a href="#projects">프로젝트</a>
          <a href="#makers">메이커</a>
          <a href="#open-crew">팀원 모집</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            aria-label="검색"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className="icon-button header-notification"
            aria-label="알림"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="notification-dot" />
          </button>

          <button
            type="button"
            className="header-avatar"
            aria-label="프로필"
          >
            N
          </button>

          <button type="button" className="button button--primary header-ship-button">
            <Plus size={17} strokeWidth={2.2} />
            프로젝트 올리기
          </button>
        </div>
      </div>
    </header>
  );
}