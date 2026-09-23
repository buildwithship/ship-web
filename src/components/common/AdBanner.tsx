'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import styles from './AdBanner.module.css';

const ads = [
  {
    id: 1,
    image:
      '/images/ads/ad-01.jpg',
    title:
      '당신의 프로젝트를 더 많은 사람에게',
    description:
      'SHIP 상단 배너를 통해 프로젝트를 소개해보세요.',
    href: '#',
  },
  {
    id: 2,
    image:
      '/images/ads/ad-02.jpg',
    title:
      '새로운 팀원을 찾고 있나요?',
    description:
      '프로젝트를 공개하고 함께할 사람을 만나보세요.',
    href: '/recruiting',
  },
  {
    id: 3,
    image:
      '/images/ads/ad-03.jpg',
    title:
      '이번 주 새로운 프로젝트',
    description:
      '지금 SHIP에 올라온 프로젝트를 확인해보세요.',
    href: '/projects',
  },
  {
    id: 4,
    image:
      '/images/ads/ad-04.jpg',
    title:
      '만드는 사람을 발견하세요',
    description:
      '다른 메이커를 구독하고 새로운 프로젝트를 만나보세요.',
    href: '/makers',
  },
  {
    id: 5,
    image:
      '/images/ads/ad-05.jpg',
    title:
      '당신의 서비스도 출항할 시간',
    description:
      '완성한 프로젝트를 SHIP에 공개해보세요.',
    href: '/projects/new',
  },
];

const AUTO_SLIDE_MS = 4500;

export default function AdBanner() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => {
        setActiveIndex(
          (prev) =>
            (prev + 1) %
            ads.length,
        );
      },
      AUTO_SLIDE_MS,
    );

    return () =>
      window.clearInterval(timer);
  }, []);

  const move = (
    direction: number,
  ) => {
    setActiveIndex((prev) => {
      return (
        prev +
        direction +
        ads.length
      ) % ads.length;
    });
  };

  return (
    <aside
      className={styles.banner}
      aria-label="광고"
    >
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${
            activeIndex * 100
          }%)`,
        }}
      >
        {ads.map((ad) => (
          <a
            key={ad.id}
            href={ad.href}
            className={styles.slide}
          >
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              priority={ad.id === 1}
              sizes="1180px"
              className={styles.image}
            />

            <div
              className={styles.overlay}
            />

            <div
              className={styles.copy}
            >
              <span>광고</span>

              <strong>
                {ad.title}
              </strong>

              <p>
                {ad.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.left}`}
        aria-label="이전 광고"
        onClick={() => move(-1)}
      >
        <ChevronLeft size={19} />
      </button>

      <button
        type="button"
        className={`${styles.arrow} ${styles.right}`}
        aria-label="다음 광고"
        onClick={() => move(1)}
      >
        <ChevronRight size={19} />
      </button>

      <div className={styles.dots}>
        {ads.map((ad, index) => (
          <button
            key={ad.id}
            type="button"
            className={
              index === activeIndex
                ? styles.activeDot
                : undefined
            }
            onClick={() =>
              setActiveIndex(index)
            }
            aria-label={`${index + 1}번째 광고`}
          />
        ))}
      </div>
    </aside>
  );
}