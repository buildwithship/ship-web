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

  const hasMultiple =
    images.length > 1;

  useEffect(() => {
    if (!hasMultiple) {
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
  ]);

  if (images.length === 0) {
    return null;
  }

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
    >
      <div
        className={
          styles.backgroundGlow
        }
      />

      <div
        className={
          styles.viewport
        }
      >
        {hasMultiple && (
          <button
            type="button"
            className={`${styles.preview} ${styles.previewLeft}`}
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
              sizes="260px"
              className={
                styles.previewImage
              }
            />

            <span
              className={
                styles.previewShade
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
            sizes="(max-width: 768px) 92vw, 760px"
            className={
              styles.mainImage
            }
          />

          <div
            className={
              styles.mainOverlay
            }
          />

          <span
            className={
              styles.imageCount
            }
          >
            {activeIndex + 1}
            <span>/</span>
            {images.length}
          </span>
        </div>

        {hasMultiple && (
          <button
            type="button"
            className={`${styles.preview} ${styles.previewRight}`}
            onClick={goNext}
            aria-label="다음 이미지 보기"
          >
            <Image
              src={
                images[nextIndex]
              }
              alt={`${projectName} 다음 이미지`}
              fill
              sizes="260px"
              className={
                styles.previewImage
              }
            />

            <span
              className={
                styles.previewShade
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
                size={21}
                strokeWidth={2.2}
              />
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={goNext}
              aria-label="다음 이미지"
            >
              <ChevronRight
                size={21}
                strokeWidth={2.2}
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
                key={`${image}-${index}`}
                type="button"
                className={
                  index ===
                  activeIndex
                    ? styles.activePage
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