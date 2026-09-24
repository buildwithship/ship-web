'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Search,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

import {
  useMemo,
  useState,
} from 'react';

import {
  receivedApplications as initialReceivedApplications,
  sentApplications as initialSentApplications,
} from '@/mocks/applications';

import {
  ApplicationStatus,
  ProjectApplication,
} from '@/types/application';

import styles from './ApplicationManager.module.css';

type TabType =
  | 'sent'
  | 'received';

type StatusFilter =
  | 'all'
  | ApplicationStatus;

const statusFilters: {
  value: StatusFilter;
  label: string;
}[] = [
  {
    value: 'all',
    label: '전체',
  },
  {
    value: 'pending',
    label: '검토중',
  },
  {
    value: 'accepted',
    label: '수락',
  },
  {
    value: 'rejected',
    label: '거절',
  },
  {
    value: 'withdrawn',
    label: '취소',
  },
];

function getStatusInfo(
  status: ApplicationStatus,
) {
  if (status === 'pending') {
    return {
      label: '검토중',
      className:
        styles.statusPending,
    };
  }

  if (status === 'accepted') {
    return {
      label: '수락',
      className:
        styles.statusAccepted,
    };
  }

  if (status === 'rejected') {
    return {
      label: '거절',
      className:
        styles.statusRejected,
    };
  }

  return {
    label: '지원 취소',
    className:
      styles.statusWithdrawn,
  };
}

interface ApplicationCardProps {
  application: ProjectApplication;
  direction: TabType;

  onWithdraw?: (
    id: number,
  ) => void;

  onAccept?: (
    id: number,
  ) => void;

  onReject?: (
    id: number,
  ) => void;

  onJoin?: (
    id: number,
  ) => void;

  onDeclineCrew?: (
    id: number,
  ) => void;
}

function ApplicationCard({
  application,
  direction,
  onWithdraw,
  onAccept,
  onReject,
  onJoin,
  onDeclineCrew,
}: ApplicationCardProps) {
  const status =
    getStatusInfo(
      application.status,
    );

  const counterpart =
    direction === 'sent'
      ? application.owner
      : application.applicant;

  return (
    <article
      className={styles.card}
    >
      <div
        className={styles.cardTop}
      >
        <Link
          href={`/projects/${application.projectSlug}`}
          className={
            styles.projectIdentity
          }
        >
          <Image
            src={
              application.projectLogoUrl
            }
            alt={`${application.projectName} 로고`}
            width={48}
            height={48}
            className={
              styles.projectLogo
            }
          />

          <div>
            <div
              className={
                styles.projectTitleRow
              }
            >
              <strong>
                {
                  application.projectName
                }
              </strong>

              <ArrowUpRight
                size={14}
                strokeWidth={2}
              />
            </div>

            <p>
              {
                application.projectTagline
              }
            </p>
          </div>
        </Link>

        <span
          className={`${styles.status} ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div
        className={styles.applicationMeta}
      >
        <span
          className={styles.role}
        >
          <BriefcaseBusiness
            size={14}
            strokeWidth={2}
          />

          {application.role}
        </span>

        <span
          className={styles.date}
        >
          <Clock3
            size={14}
            strokeWidth={2}
          />

          {application.appliedAt}
        </span>
      </div>

      <div
        className={
          styles.messageBox
        }
      >
        <span>
          {direction === 'sent'
            ? '내가 보낸 메시지'
            : '지원 메시지'}
        </span>

        <p>
          {application.message}
        </p>
      </div>

      {application.portfolioUrl && (
        <a
          href={
            application.portfolioUrl
          }
          target="_blank"
          rel="noreferrer"
          className={
            styles.portfolio
          }
        >
          <ExternalLink
            size={15}
            strokeWidth={2}
          />

          포트폴리오 보기
        </a>
      )}

      {application.status ===
        'accepted' &&
        application.crewStatus ===
          'invited' && (
          <div
            className={
              styles.crewNotice
            }
          >
            <div
              className={
                styles.crewNoticeIcon
              }
            >
              <UserCheck
                size={19}
                strokeWidth={2}
              />
            </div>

            <div>
              <strong>
                {direction === 'sent'
                  ? 'CREW 합류 요청이 도착했어요'
                  : 'CREW 합류 요청을 보냈어요'}
              </strong>

              <p>
                {direction === 'sent'
                  ? '합류를 확정하면 프로젝트 멤버로 등록되고 프로필에도 표시됩니다.'
                  : '지원자가 최종 수락하면 프로젝트의 CREW로 등록됩니다.'}
              </p>
            </div>
          </div>
        )}

      {application.crewStatus ===
        'joined' && (
        <div
          className={
            styles.joinedNotice
          }
        >
          <CheckCircle2
            size={18}
            strokeWidth={2}
          />

          <span>
            CREW 합류 완료
          </span>
        </div>
      )}

      <div
        className={styles.footer}
      >
        <Link
          href={`/makers/${counterpart.username}`}
          className={styles.user}
        >
          <Image
            src={
              counterpart.avatarUrl
            }
            alt={counterpart.name}
            width={30}
            height={30}
          />

          <div>
            <span>
              {direction === 'sent'
                ? '프로젝트 운영자'
                : '지원자'}
            </span>

            <strong>
              {counterpart.name}
            </strong>
          </div>
        </Link>

        <div
          className={
            styles.actions
          }
        >
          {direction === 'sent' &&
            application.status ===
              'pending' && (
              <button
                type="button"
                className={
                  styles.secondaryButton
                }
                onClick={() =>
                  onWithdraw?.(
                    application.id,
                  )
                }
              >
                지원 취소
              </button>
            )}

          {direction === 'sent' &&
            application.status ===
              'accepted' &&
            application.crewStatus ===
              'invited' && (
              <>
                <button
                  type="button"
                  className={
                    styles.secondaryButton
                  }
                  onClick={() =>
                    onDeclineCrew?.(
                      application.id,
                    )
                  }
                >
                  합류 거절
                </button>

                <button
                  type="button"
                  className={
                    styles.primaryButton
                  }
                  onClick={() =>
                    onJoin?.(
                      application.id,
                    )
                  }
                >
                  <Check
                    size={15}
                  />

                  합류 확정
                </button>
              </>
            )}

          {direction ===
            'received' &&
            application.status ===
              'pending' && (
              <>
                <button
                  type="button"
                  className={
                    styles.rejectButton
                  }
                  onClick={() =>
                    onReject?.(
                      application.id,
                    )
                  }
                >
                  <X
                    size={15}
                  />

                  거절
                </button>

                <button
                  type="button"
                  className={
                    styles.primaryButton
                  }
                  onClick={() =>
                    onAccept?.(
                      application.id,
                    )
                  }
                >
                  <Check
                    size={15}
                  />

                  수락
                </button>
              </>
            )}

          <Link
            href={`/projects/${application.projectSlug}`}
            className={
              styles.projectButton
            }
          >
            프로젝트 보기
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ApplicationManager() {
  const [activeTab, setActiveTab] =
    useState<TabType>('sent');

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState<StatusFilter>(
      'all',
    );

  const [keyword, setKeyword] =
    useState('');

  const [
    sentApplications,
    setSentApplications,
  ] = useState(
    initialSentApplications,
  );

  const [
    receivedApplications,
    setReceivedApplications,
  ] = useState(
    initialReceivedApplications,
  );

  const currentApplications =
    activeTab === 'sent'
      ? sentApplications
      : receivedApplications;

  const filteredApplications =
    useMemo(() => {
      const normalizedKeyword =
        keyword
          .trim()
          .toLowerCase();

      return currentApplications.filter(
        (application) => {
          const matchesStatus =
            statusFilter ===
              'all' ||
            application.status ===
              statusFilter;

          const counterpart =
            activeTab ===
            'sent'
              ? application.owner
              : application.applicant;

          const matchesKeyword =
            normalizedKeyword ===
              '' ||
            application.projectName
              .toLowerCase()
              .includes(
                normalizedKeyword,
              ) ||
            application.role
              .toLowerCase()
              .includes(
                normalizedKeyword,
              ) ||
            counterpart.name
              .toLowerCase()
              .includes(
                normalizedKeyword,
              );

          return (
            matchesStatus &&
            matchesKeyword
          );
        },
      );
    }, [
      activeTab,
      currentApplications,
      keyword,
      statusFilter,
    ]);

  const pendingReceivedCount =
    receivedApplications.filter(
      (application) =>
        application.status ===
        'pending',
    ).length;

  const acceptedSentCount =
    sentApplications.filter(
      (application) =>
        application.status ===
        'accepted',
    ).length;

  const crewCount =
    sentApplications.filter(
      (application) =>
        application.crewStatus ===
        'joined',
    ).length;

  const updateSent = (
    id: number,
    update: Partial<ProjectApplication>,
  ) => {
    setSentApplications(
      (prev) =>
        prev.map(
          (application) =>
            application.id === id
              ? {
                  ...application,
                  ...update,
                }
              : application,
        ),
    );
  };

  const updateReceived = (
    id: number,
    update: Partial<ProjectApplication>,
  ) => {
    setReceivedApplications(
      (prev) =>
        prev.map(
          (application) =>
            application.id === id
              ? {
                  ...application,
                  ...update,
                }
              : application,
        ),
    );
  };

  const handleWithdraw = (
    id: number,
  ) => {
    updateSent(id, {
      status: 'withdrawn',
    });
  };

  const handleAccept = (
    id: number,
  ) => {
    updateReceived(id, {
      status: 'accepted',
      crewStatus: 'invited',
    });
  };

  const handleReject = (
    id: number,
  ) => {
    updateReceived(id, {
      status: 'rejected',
      crewStatus: 'none',
    });
  };

  const handleJoin = (
    id: number,
  ) => {
    updateSent(id, {
      crewStatus: 'joined',
    });
  };

  const handleDeclineCrew = (
    id: number,
  ) => {
    updateSent(id, {
      crewStatus: 'declined',
    });
  };

  return (
    <div
      className={styles.manager}
    >
      <section
        className={styles.summary}
      >
        <div>
          <span>
            받은 새 지원
          </span>

          <strong>
            {pendingReceivedCount}
          </strong>
        </div>

        <div>
          <span>
            수락된 내 지원
          </span>

          <strong>
            {acceptedSentCount}
          </strong>
        </div>

        <div>
          <span>
            합류 완료
          </span>

          <strong>
            {crewCount}
          </strong>
        </div>
      </section>

      <div
        className={styles.toolbar}
      >
        <div
          className={styles.tabs}
        >
          <button
            type="button"
            className={
              activeTab === 'sent'
                ? styles.activeTab
                : undefined
            }
            onClick={() => {
              setActiveTab('sent');
              setStatusFilter('all');
            }}
          >
            내 지원

            <span>
              {
                sentApplications.length
              }
            </span>
          </button>

          <button
            type="button"
            className={
              activeTab ===
              'received'
                ? styles.activeTab
                : undefined
            }
            onClick={() => {
              setActiveTab(
                'received',
              );

              setStatusFilter(
                'all',
              );
            }}
          >
            받은 지원

            {pendingReceivedCount >
              0 && (
              <span
                className={
                  styles.newCount
                }
              >
                {
                  pendingReceivedCount
                }
              </span>
            )}
          </button>
        </div>

        <label
          className={styles.search}
        >
          <Search
            size={17}
            strokeWidth={2}
          />

          <input
            value={keyword}
            onChange={(event) =>
              setKeyword(
                event.target.value,
              )
            }
            placeholder="프로젝트, 포지션, 이름 검색"
          />
        </label>
      </div>

      <div
        className={
          styles.filterRow
        }
      >
        {statusFilters.map(
          (filter) => (
            <button
              key={filter.value}
              type="button"
              className={
                statusFilter ===
                filter.value
                  ? styles.activeFilter
                  : undefined
              }
              onClick={() =>
                setStatusFilter(
                  filter.value,
                )
              }
            >
              {filter.label}
            </button>
          ),
        )}
      </div>

      <div
        className={
          styles.resultHeading
        }
      >
        <strong>
          {activeTab === 'sent'
            ? '내가 지원한 프로젝트'
            : '내 프로젝트에 온 지원'}
        </strong>

        <span>
          {
            filteredApplications.length
          }
          건
        </span>
      </div>

      {filteredApplications.length >
      0 ? (
        <div className={styles.list}>
          {filteredApplications.map(
            (application) => (
              <ApplicationCard
                key={
                  application.id
                }
                application={
                  application
                }
                direction={
                  activeTab
                }
                onWithdraw={
                  handleWithdraw
                }
                onAccept={
                  handleAccept
                }
                onReject={
                  handleReject
                }
                onJoin={
                  handleJoin
                }
                onDeclineCrew={
                  handleDeclineCrew
                }
              />
            ),
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <div
            className={
              styles.emptyIcon
            }
          >
            {activeTab ===
            'sent' ? (
              <BriefcaseBusiness
                size={25}
              />
            ) : (
              <Users
                size={25}
              />
            )}
          </div>

          <strong>
            조건에 맞는 지원 내역이 없어요.
          </strong>

          <p>
            필터나 검색어를 변경해보세요.
          </p>
        </div>
      )}
    </div>
  );
}