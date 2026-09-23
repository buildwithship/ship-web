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

import styles from './ProjectGallery.module.css';

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

const AUTO_SLIDE_DELAY = 4500;

export default function ProjectGallery({
  images,
  projectName,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const hasMultiple =
    images.length > 1;

  const previousIndex =
    (
      activeIndex -
      1 +
      images.length
    ) % images.length;

  const nextIndex =
    (
      activeIndex +
      1
    ) % images.length;

  useEffect(() => {
    if (
      !hasMultiple ||
      isPaused
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setActiveIndex(
          (prev) =>
            (prev + 1) %
            images.length,
        );
      }, AUTO_SLIDE_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    hasMultiple,
    images.length,
    isPaused,
  ]);

  if (images.length === 0) {
    return null;
  }

  const goPrevious = () => {
    setActiveIndex(
      previousIndex,
    );
  };

  const goNext = () => {
    setActiveIndex(
      nextIndex,
    );
  };

  return (
    <section
      className={styles.gallery}
      aria-label={`${projectName} 프로젝트 이미지`}
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >
      <div className={styles.viewport}>
        {hasMultiple && (
          <button
            type="button"
            className={`${styles.sidePreview} ${styles.leftPreview}`}
            onClick={goPrevious}
            aria-label="이전 이미지 보기"
          >
            <Image
              src={
                images[
                  previousIndex
                ]
              }
              alt={`${projectName} 이전 이미지`}
              fill
              sizes="220px"
              className={
                styles.sideImage
              }
            />

            <span
              className={
                styles.sideOverlay
              }
            />
          </button>
        )}

        <div
          className={
            styles.mainSlide
          }
        >
          <Image
            key={
              images[activeIndex]
            }
            src={
              images[activeIndex]
            }
            alt={`${projectName} 이미지 ${
              activeIndex + 1
            }`}
            fill
            priority={
              activeIndex === 0
            }
            sizes="(max-width: 700px) 92vw, 520px"
            className={
              styles.mainImage
            }
          />
        </div>

        {hasMultiple && (
          <button
            type="button"
            className={`${styles.sidePreview} ${styles.rightPreview}`}
            onClick={goNext}
            aria-label="다음 이미지 보기"
          >
            <Image
              src={
                images[nextIndex]
              }
              alt={`${projectName} 다음 이미지`}
              fill
              sizes="220px"
              className={
                styles.sideImage
              }
            />

            <span
              className={
                styles.sideOverlay
              }
            />
          </button>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={goPrevious}
              aria-label="이전 이미지"
            >
              <ChevronLeft
                size={24}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={goNext}
              aria-label="다음 이미지"
            >
              <ChevronRight
                size={24}
                strokeWidth={1.8}
              />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div
          className={
            styles.pagination
          }
        >
          <span
            className={
              styles.pageNumber
            }
          >
            {activeIndex + 1}
          </span>

          <div
            className={
              styles.pageDots
            }
          >
            {images.map(
              (
                image,
                index,
              ) => (
                <button
                  key={`${image}-${index}`}
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
                  }번째 이미지`}
                />
              ),
            )}
          </div>

          <span
            className={
              styles.totalNumber
            }
          >
            {images.length}
          </span>
        </div>
      )}
    </section>
  );
}