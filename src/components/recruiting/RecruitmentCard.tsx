import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  Clock3,
  Users,
} from 'lucide-react';

import { Recruitment } from '@/types/recruitment';

import styles from './RecruitmentCard.module.css';

interface RecruitmentCardProps {
  recruitment: Recruitment;
}

export default function RecruitmentCard({
  recruitment,
}: RecruitmentCardProps) {
  const isClosingSoon =
    recruitment.type === 'closingSoon';

  return (
    <article className={styles.card}>
      <Link
        href={`/projects/${recruitment.projectSlug}`}
        className={styles.banner}
      >
        <Image
          src={recruitment.projectBannerUrl}
          alt={`${recruitment.projectName} 프로젝트`}
          fill
          sizes="230px"
          className={styles.bannerImage}
        />

        <div
          className={styles.bannerOverlay}
        />

        <span
          className={`${styles.recruitStatus} ${
            isClosingSoon
              ? styles.closingSoon
              : styles.ongoing
          }`}
        >
          {isClosingSoon
            ? '마감 임박'
            : '모집 중'}
        </span>
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <Image
            src={
              recruitment.projectLogoUrl
            }
            alt={`${recruitment.projectName} 로고`}
            width={46}
            height={46}
            className={styles.logo}
          />

          <div className={styles.projectInfo}>
            <Link
              href={`/projects/${recruitment.projectSlug}`}
              className={styles.projectName}
            >
              {recruitment.projectName}
            </Link>

            <p>
              {recruitment.projectTagline}
            </p>
          </div>
        </div>

        <div className={styles.positions}>
          {recruitment.positions.map(
            (position) => (
              <span
                key={position.role}
                className={styles.position}
              >
                <strong>
                  {position.role}
                </strong>

                <span>
                  {position.count}명
                </span>
              </span>
            ),
          )}
        </div>

        <p className={styles.description}>
          {recruitment.shortDescription}
        </p>

        <div className={styles.footer}>
          <div className={styles.leftMeta}>
            <Link
              href={`/makers/${recruitment.makerUsername}`}
              className={styles.maker}
            >
              <Image
                src={
                  recruitment.makerAvatarUrl
                }
                alt={
                  recruitment.makerName
                }
                width={26}
                height={26}
              />

              <span>
                {recruitment.makerName}
              </span>
            </Link>

            <span className={styles.metaItem}>
              <Users
                size={15}
                strokeWidth={2}
              />

              {recruitment.teamSize}명
            </span>

            <span className={styles.metaItem}>
              <Clock3
                size={15}
                strokeWidth={2}
              />

              {recruitment.createdAt}
            </span>
          </div>

          <Link
            href={`/projects/${recruitment.projectSlug}`}
            className={styles.applyButton}
          >
            모집 보기

            <ArrowRight
              size={16}
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}