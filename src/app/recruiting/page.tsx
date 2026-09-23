import Link from 'next/link';

import {
  ArrowRight,
  BriefcaseBusiness,
  Plus,
  Users,
} from 'lucide-react';

import RecruitmentBoard from '@/components/recruiting/RecruitmentBoard';

import { recruitments } from '@/mocks/recruitments';

import styles from './page.module.css';

export default function RecruitingPage() {
  const openPositionCount =
    recruitments.reduce(
      (total, recruitment) =>
        total +
        recruitment.positions.reduce(
          (
            positionTotal,
            position,
          ) =>
            positionTotal +
            position.count,
          0,
        ),
      0,
    );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div
            className={
              styles.heroIcon
            }
          >
            <Users
              size={25}
              strokeWidth={2}
            />
          </div>

          <div>
            <h1>
              함께 만들 사람을 찾고 있어요
            </h1>

            <p>
              진행 중인 프로젝트와
              모집 포지션을 한곳에서
              확인해보세요.
            </p>
          </div>
        </div>

        <Link
          href="/projects/new"
          className={styles.createButton}
        >
          <Plus
            size={17}
            strokeWidth={2.2}
          />

          팀원 모집하기
        </Link>
      </section>

      <section className={styles.summary}>
        <div>
          <span>
            모집 프로젝트
          </span>

          <strong>
            {recruitments.length}
          </strong>
        </div>

        <div>
          <span>
            열린 포지션
          </span>

          <strong>
            {openPositionCount}
          </strong>
        </div>

        <div>
          <span>
            가장 많이 찾는 역할
          </span>

          <strong>
            Design
          </strong>
        </div>
      </section>

      <div className={styles.layout}>
        <section className={styles.content}>
          <RecruitmentBoard
            recruitments={
              recruitments
            }
          />
        </section>

        <aside className={styles.side}>
          <section className={styles.sideCard}>
            <div
              className={
                styles.sideIcon
              }
            >
              <BriefcaseBusiness
                size={20}
              />
            </div>

            <h3>
              내 프로젝트도 팀원을
              찾고 있나요?
            </h3>

            <p>
              프로젝트를 등록하고 모집
              포지션을 열어보세요.
            </p>

            <Link
              href="/projects/new"
            >
              프로젝트 등록
              <ArrowRight
                size={15}
              />
            </Link>
          </section>

          <section className={styles.tipCard}>
            <h3>
              지원 전에 확인하세요
            </h3>

            <p>
              프로젝트 소개와 현재 팀 구성을
              확인한 뒤 메이커 프로필도 함께
              살펴보는 걸 권장해요.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}