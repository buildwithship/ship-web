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

const AUTO_SLIDE_DELAY = 5000;

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
      (prev) =>
        (
          prev -
          1 +
          images.length
        ) % images.length,
    );
  };

  const goNext = () => {
    setActiveIndex(
      (prev) =>
        (prev + 1) %
        images.length,
    );
  };

  const getRelativePosition = (
    index: number,
  ) => {
    const length =
      images.length;

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
      className={styles.gallery}
      aria-label={`${projectName} 프로젝트 이미지`}
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >
      <div
        className={
          styles.viewport
        }
      >
        {images.map(
          (image, index) => {
            const position =
              getRelativePosition(
                index,
              );

            const isClickable =
              position === -1 ||
              position === 1;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`${styles.slide} ${getSlideClass(
                  index,
                )}`}
                onClick={() => {
                  if (
                    position ===
                    -1
                  ) {
                    goPrevious();
                  }

                  if (
                    position === 1
                  ) {
                    goNext();
                  }
                }}
                tabIndex={
                  isClickable
                    ? 0
                    : -1
                }
                aria-label={
                  position === -1
                    ? '이전 이미지 보기'
                    : position ===
                        1
                      ? '다음 이미지 보기'
                      : `${
                          index + 1
                        }번째 이미지`
                }
              >
                <Image
                  src={image}
                  alt={`${projectName} 이미지 ${
                    index + 1
                  }`}
                  fill
                  priority={
                    index === 0
                  }
                  sizes="(max-width: 640px) 90vw, 540px"
                  className={
                    styles.image
                  }
                />

                <span
                  className={
                    styles.shade
                  }
                />
              </button>
            );
          },
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
                size={25}
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
                size={25}
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
          {images.map(
            (
              image,
              index,
            ) => (
              <button
                key={`${image}-page-${index}`}
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
      )}
    </section>
  );
}