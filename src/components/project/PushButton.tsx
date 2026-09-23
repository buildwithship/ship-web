'use client';

import { useRef, useState } from 'react';

import styles from './PushButton.module.css';

interface PushButtonProps {
  initialCount: number;
  compact?: boolean;
}

function ShipIcon() {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <path
        d="M21.6 5.2v18.1L9.7 20.7c2.7-6.9 6.6-12.1 11.9-15.5Z"
        fill="currentColor"
        opacity="0.55"
      />

      <path
        d="M24 8.6v14.9l10.5-2.2C32 15.8 28.5 11.6 24 8.6Z"
        fill="currentColor"
      />

      <path
        d="M8.3 25.2h27.4l-3.6 6.3H12l-3.7-6.3Z"
        fill="currentColor"
        opacity="0.84"
      />

      <path
        d="M9.5 35.3c2.7 1.5 5.3 1.5 8 0 2.7-1.5 5.3-1.5 8 0 2.7 1.5 5.3 1.5 8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PushButton({
  initialCount,
  compact = false,
}: PushButtonProps) {
  const [pushed, setPushed] =
    useState(false);

  const [effect, setEffect] =
    useState(false);

  const timerRef =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  const count =
    initialCount + (pushed ? 1 : 0);

  const handlePush = () => {
    setPushed((prev) => !prev);

    setEffect(false);

    requestAnimationFrame(() => {
      setEffect(true);
    });

    if (timerRef.current) {
      clearTimeout(
        timerRef.current,
      );
    }

    timerRef.current =
      setTimeout(() => {
        setEffect(false);
      }, 750);
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${
        pushed ? styles.active : ''
      } ${
        compact ? styles.compact : ''
      }`}
      onClick={handlePush}
      aria-pressed={pushed}
    >
      <span className={styles.icon}>
        <ShipIcon />
      </span>

      <strong>PUSH</strong>

      <span className={styles.count}>
        {count}
      </span>

      {effect && (
        <span
          className={styles.effect}
          aria-hidden="true"
        >
          <span
            className={
              styles.flyingShip
            }
          >
            <ShipIcon />
          </span>

          <span
            className={
              styles.waveOne
            }
          />

          <span
            className={
              styles.waveTwo
            }
          />
        </span>
      )}
    </button>
  );
}