'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  Bell,
  Check,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';

import { ShipNotification } from '@/types/notification';

import styles from './NotificationPanel.module.css';

interface NotificationPanelProps {
  notifications: ShipNotification[];

  onRead: (id: number) => void;
  onReadAll: () => void;
  onClose: () => void;
}

function NotificationTypeIcon({
  type,
}: {
  type: ShipNotification['type'];
}) {
  if (type === 'application_received') {
    return (
      <UserPlus
        size={12}
        strokeWidth={2.2}
      />
    );
  }

  if (type === 'application_accepted') {
    return (
      <Check
        size={12}
        strokeWidth={2.4}
      />
    );
  }

  if (type === 'crew_invite') {
    return (
      <Users
        size={12}
        strokeWidth={2.2}
      />
    );
  }

  if (type === 'project_invite') {
    return (
      <UserCheck
        size={12}
        strokeWidth={2.2}
      />
    );
  }

  return (
    <Bell
      size={12}
      strokeWidth={2.2}
    />
  );
}

export default function NotificationPanel({
  notifications,
  onRead,
  onReadAll,
  onClose,
}: NotificationPanelProps) {
  const unreadCount =
    notifications.filter(
      (notification) => !notification.read,
    ).length;

  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        <div className={styles.title}>
          <strong>알림</strong>

          {unreadCount > 0 && (
            <span>
              {unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onReadAll}
          >
            모두 읽음
          </button>
        )}
      </header>

      <div className={styles.list}>
        {notifications.length > 0 ? (
          notifications.map(
            (notification) => (
              <Link
                key={notification.id}
                href={
                  notification.href ?? '/'
                }
                className={`${styles.item} ${
                  notification.read
                    ? styles.read
                    : styles.unread
                }`}
                onClick={() => {
                  onRead(
                    notification.id,
                  );

                  onClose();
                }}
              >
                <div
                  className={
                    styles.visual
                  }
                >
                  {notification.imageUrl ? (
                    <Image
                      src={
                        notification.imageUrl
                      }
                      alt=""
                      width={42}
                      height={42}
                      className={
                        styles.image
                      }
                    />
                  ) : (
                    <div
                      className={
                        styles.fallback
                      }
                    >
                      <Bell
                        size={18}
                        strokeWidth={2}
                      />
                    </div>
                  )}

                  <span
                    className={
                      styles.typeIcon
                    }
                  >
                    <NotificationTypeIcon
                      type={
                        notification.type
                      }
                    />
                  </span>
                </div>

                <div
                  className={
                    styles.content
                  }
                >
                  <div
                    className={
                      styles.notificationTitle
                    }
                  >
                    <strong>
                      {
                        notification.title
                      }
                    </strong>

                    {!notification.read && (
                      <span
                        className={
                          styles.unreadDot
                        }
                      />
                    )}
                  </div>

                  <p>
                    {
                      notification.message
                    }
                  </p>

                  <span
                    className={
                      styles.time
                    }
                  >
                    {
                      notification.createdAt
                    }
                  </span>
                </div>
              </Link>
            ),
          )
        ) : (
          <div className={styles.empty}>
            <Bell
              size={25}
              strokeWidth={1.8}
            />

            <strong>
              새로운 알림이 없어요
            </strong>

            <p>
              프로젝트와 지원 관련 알림이
              여기에 표시됩니다.
            </p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <Link
          href="/applications"
          onClick={onClose}
        >
          지원 관리 보기
        </Link>
      </footer>
    </div>
  );
}