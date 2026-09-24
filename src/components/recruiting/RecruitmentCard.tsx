'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  ArrowRight,
  Clock3,
  Users,
} from 'lucide-react';

import RecruitmentApplyModal from './RecruitmentApplyModal';

import { Recruitment } from '@/types/recruitment';

import styles from './RecruitmentCard.module.css';

interface RecruitmentCardProps {
  recruitment: Recruitment;
}

export default function RecruitmentCard({
  recruitment,
}: RecruitmentCardProps) {
  const [applyOpen, setApplyOpen] =
    useState(false);

  const isClosingSoon =
    recruitment.type ===
    'closingSoon';

  return (
    <>
      <article
        className={styles.card}
      >
        <Link
          href={`/projects/${recruitment.projectSlug}`}
          className={styles.banner}
        >
          <Image
            src={
              recruitment.projectBannerUrl
            }
            alt={`${recruitment.projectName} 프로젝트`}
            fill
            sizes="230px"
            className={
              styles.bannerImage
            }
          />

          <div
            className={
              styles.bannerOverlay
            }
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

        <div
          className={styles.content}
        >
          <div
            className={styles.header}
          >
            <Image
              src={
                recruitment.projectLogoUrl
              }
              alt={`${recruitment.projectName} 로고`}
              width={46}
              height={46}
              className={styles.logo}
            />

            <div
              className={
                styles.projectInfo
              }
            >
              <Link
                href={`/projects/${recruitment.projectSlug}`}
                className={
                  styles.projectName
                }
              >
                {
                  recruitment.projectName
                }
              </Link>

              <p>
                {
                  recruitment.projectTagline
                }
              </p>
            </div>
          </div>

          <div
            className={
              styles.positions
            }
          >
            {recruitment.positions.map(
              (position) => (
                <span
                  key={
                    position.role
                  }
                  className={
                    styles.position
                  }
                >
                  <strong>
                    {
                      position.role
                    }
                  </strong>

                  <span>
                    {
                      position.count
                    }
                    명
                  </span>
                </span>
              ),
            )}
          </div>

          <p
            className={
              styles.description
            }
          >
            {
              recruitment.shortDescription
            }
          </p>

          <div
            className={styles.footer}
          >
            <div
              className={
                styles.leftMeta
              }
            >
              <Link
                href={`/makers/${recruitment.makerUsername}`}
                className={
                  styles.maker
                }
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
                  {
                    recruitment.makerName
                  }
                </span>
              </Link>

              <span
                className={
                  styles.metaItem
                }
              >
                <Users
                  size={15}
                />
                {
                  recruitment.teamSize
                }
                명
              </span>

              <span
                className={
                  styles.metaItem
                }
              >
                <Clock3
                  size={15}
                />
                {
                  recruitment.createdAt
                }
              </span>
            </div>

            <div
              className={
                styles.actions
              }
            >
              <Link
                href={`/projects/${recruitment.projectSlug}`}
                className={
                  styles.detailButton
                }
              >
                상세

                <ArrowRight
                  size={15}
                />
              </Link>

              <button
                type="button"
                className={
                  styles.applyButton
                }
                onClick={() =>
                  setApplyOpen(
                    true,
                  )
                }
              >
                지원하기
              </button>
            </div>
          </div>
        </div>
      </article>

      <RecruitmentApplyModal
        recruitment={
          recruitment
        }
        open={applyOpen}
        onClose={() =>
          setApplyOpen(false)
        }
      />
    </>
  );
}