'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  Search,
} from 'lucide-react';

import RecruitmentCard from './RecruitmentCard';

import {
  Recruitment,
  RecruitmentRole,
} from '@/types/recruitment';

import styles from './RecruitmentBoard.module.css';

interface RecruitmentBoardProps {
  recruitments: Recruitment[];
}

type RoleFilter =
  | '전체'
  | RecruitmentRole;

const filters: RoleFilter[] = [
  '전체',
  'Frontend',
  'Backend',
  'iOS',
  'Android',
  'Design',
  'PM',
];

export default function RecruitmentBoard({
  recruitments,
}: RecruitmentBoardProps) {
  const [role, setRole] =
    useState<RoleFilter>(
      '전체',
    );

  const [keyword, setKeyword] =
    useState('');

  const filteredRecruitments =
    useMemo(() => {
      return recruitments.filter(
        (recruitment) => {
          const matchesRole =
            role === '전체' ||
            recruitment.positions.some(
              (position) =>
                position.role ===
                role,
            );

          const normalizedKeyword =
            keyword
              .trim()
              .toLowerCase();

          const matchesKeyword =
            normalizedKeyword.length ===
              0 ||
            recruitment.projectName
              .toLowerCase()
              .includes(
                normalizedKeyword,
              ) ||
            recruitment.projectTagline
              .toLowerCase()
              .includes(
                normalizedKeyword,
              ) ||
            recruitment.positions.some(
              (position) =>
                position.role
                  .toLowerCase()
                  .includes(
                    normalizedKeyword,
                  ),
            );

          return (
            matchesRole &&
            matchesKeyword
          );
        },
      );
    }, [
      recruitments,
      role,
      keyword,
    ]);

  return (
    <div className={styles.board}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          {filters.map(
            (filter) => (
              <button
                key={filter}
                type="button"
                className={
                  role === filter
                    ? styles.active
                    : undefined
                }
                onClick={() =>
                  setRole(
                    filter,
                  )
                }
              >
                {filter}
              </button>
            ),
          )}
        </div>

        <label
          className={
            styles.search
          }
        >
          <Search
            size={17}
            strokeWidth={2}
          />

          <input
            value={keyword}
            onChange={(
              event,
            ) =>
              setKeyword(
                event.target
                  .value,
              )
            }
            placeholder="프로젝트 또는 포지션 검색"
          />
        </label>
      </div>

      <div
        className={styles.resultHeader}
      >
        <strong>
          모집 중인 프로젝트
        </strong>

        <span>
          {
            filteredRecruitments.length
          }
          개
        </span>
      </div>

      {filteredRecruitments.length >
      0 ? (
        <div className={styles.list}>
          {filteredRecruitments.map(
            (recruitment) => (
              <RecruitmentCard
                key={
                  recruitment.id
                }
                recruitment={
                  recruitment
                }
              />
            ),
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>
            조건에 맞는 모집이 없어요.
          </strong>

          <p>
            다른 포지션을 선택하거나
            검색어를 변경해보세요.
          </p>
        </div>
      )}
    </div>
  );
}