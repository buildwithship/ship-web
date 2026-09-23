'use client';

import { useState } from 'react';

import { Check, Plus } from 'lucide-react';

import styles from './WatchButton.module.css';

interface WatchButtonProps {
  initialCount?: number;
  showCount?: boolean;
}

export default function WatchButton({
  initialCount = 0,
  showCount = false,
}: WatchButtonProps) {
  const [watching, setWatching] =
    useState(false);

  const count =
    initialCount + (watching ? 1 : 0);

  return (
    <button
      type="button"
      className={`${styles.button} ${
        watching ? styles.active : ''
      }`}
      onClick={() =>
        setWatching((prev) => !prev)
      }
      aria-pressed={watching}
    >
      {watching ? (
        <Check size={15} strokeWidth={2.2} />
      ) : (
        <Plus size={15} strokeWidth={2.2} />
      )}

      {watching ? '구독 중' : '구독하기'}

      {showCount && (
        <span className={styles.count}>
          {count}
        </span>
      )}
    </button>
  );
}