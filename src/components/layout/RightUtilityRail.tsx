import Link from 'next/link';

import {
  MessageSquarePlus,
} from 'lucide-react';

import styles from './RightUtilityRail.module.css';

const INSTAGRAM_URL =
  'https://www.instagram.com/';

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="instagram-gradient"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stopColor="#FFDC80"
          />

          <stop
            offset="30%"
            stopColor="#FC5571"
          />

          <stop
            offset="65%"
            stopColor="#C13584"
          />

          <stop
            offset="100%"
            stopColor="#833AB4"
          />
        </linearGradient>
      </defs>

      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        fill="none"
        stroke="url(#instagram-gradient)"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="none"
        stroke="url(#instagram-gradient)"
        strokeWidth="2"
      />

      <circle
        cx="17.5"
        cy="6.7"
        r="1.15"
        fill="#C13584"
      />
    </svg>
  );
}

export default function RightUtilityRail() {
  return (
    <aside
      className={styles.rail}
      aria-label="바로가기"
    >
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        className={`${styles.item} ${styles.instagram}`}
        aria-label="SHIP 인스타그램"
      >
        <span
          className={styles.icon}
        >
          <InstagramIcon />
        </span>

        <span
          className={styles.tooltip}
        >
          Instagram
        </span>
      </a>

      <Link
        href="/feedback"
        className={`${styles.item} ${styles.feedback}`}
        aria-label="건의함"
      >
        <span
          className={styles.icon}
        >
          <MessageSquarePlus
            size={20}
            strokeWidth={2}
          />
        </span>

        <span
          className={styles.label}
        >
          건의함
        </span>

        <span
          className={styles.tooltip}
        >
          건의함
        </span>
      </Link>
    </aside>
  );
}