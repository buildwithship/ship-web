'use client';

import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  useEffect,
  useState,
} from 'react';

import styles from './AdBanner.module.css';

interface BannerItem {
  id: number;
  image: string;
  title: string;
  description: string;
  href: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    image: '/images/ads/ad-01.jpg',
    title: '당신의 프로젝트를 더 많은 사람에게',
    description: '새로운 프로젝트를 SHIP에서 발견해보세요.',
    href: '/projects',
  },
  {
    id: 2,
    image: '/images/ads/ad-02.jpg',
    title: '함께 만들 사람을 찾고 있나요?',
    description: '지금 새로운 팀원을 찾는 프로젝트를 만나보세요.',
    href: '/recruiting',
  },
  {
    id: 3,
    image: '/images/ads/ad-03.jpg',
    title: '새로운 서비스가 도착했어요',
    description: '방금 공개된 프로젝트를 가장 먼저 확인해보세요.',
    href: '/projects',
  },
  {
    id: 4,
    image: '/images/ads/ad-04.jpg',
    title: '만드는 사람을 발견하세요',
    description: '관심 있는 메이커의 다음 프로젝트를 지켜보세요.',
    href: '/makers',
  },
  {
    id: 5,
    image: '/images/ads/ad-05.jpg',
    title: '당신의 서비스도 세상 밖으로',
    description: '완성한 프로젝트를 SHIP에 공개해보세요.',
    href: '/projects/new',
  },
];

const AUTO_SLIDE_DELAY = 5000;

export default function AdBanner() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setActiveIndex(
          (prev) =>
            (prev + 1) %
            banners.length,
        );
      }, AUTO_SLIDE_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  const goPrevious = () => {
    setActiveIndex(
      (prev) =>
        (
          prev -
          1 +
          banners.length
        ) % banners.length,
    );
  };

  const goNext = () => {
    setActiveIndex(
      (prev) =>
        (prev + 1) %
        banners.length,
    );
  };

  const getRelativePosition = (
    index: number,
  ) => {
    const length =
      banners.length;

    let offset =
      index - activeIndex;

    if (offset > length / 2) {
      offset -= length;
    }

    if (
      offset <
      -length / 2
    ) {
      offset += length;
    }

    return offset;
  };

  const getSlideClass = (
    index: number,
  ) => {
    const position =
      getRelativePosition(index);

    if (position === 0) {
      return styles.active;
    }

    if (position === -1) {
      return styles.previous;
    }

    if (position === 1) {
      return styles.next;
    }

    if (position < -1) {
      return styles.hiddenLeft;
    }

    return styles.hiddenRight;
  };

  return (
    <section
      className={styles.banner}
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
      aria-label="프로모션 배너"
    >
      <div
        className={
          styles.viewport
        }
      >
        {banners.map(
          (item, index) => {
            const isActive =
              index ===
              activeIndex;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`${styles.slide} ${getSlideClass(
                  index,
                )}`}
                tabIndex={
                  isActive
                    ? 0
                    : -1
                }
                aria-hidden={
                  !isActive
                }
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={
                    index === 0
                  }
                  sizes="(max-width: 720px) 90vw, 780px"
                  className={
                    styles.image
                  }
                />

                <div
                  className={
                    styles.overlay
                  }
                />

                <div
                  className={
                    styles.copy
                  }
                >
                  <strong>
                    {item.title}
                  </strong>

                  <p>
                    {
                      item.description
                    }
                  </p>
                </div>
              </a>
            );
          },
        )}

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={goPrevious}
          aria-label="이전 배너"
        >
          <ChevronLeft
            size={23}
            strokeWidth={2}
          />
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={goNext}
          aria-label="다음 배너"
        >
          <ChevronRight
            size={23}
            strokeWidth={2}
          />
        </button>
      </div>

      <div
        className={
          styles.pagination
        }
      >
        {banners.map(
          (item, index) => (
            <button
              key={item.id}
              type="button"
              className={
                index ===
                activeIndex
                  ? styles.activeDot
                  : undefined
              }
              onClick={() =>
                setActiveIndex(
                  index,
                )
              }
              aria-label={`${
                index + 1
              }번째 배너`}
            />
          ),
        )}
      </div>
    </section>
  );
}