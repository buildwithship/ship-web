import Image from 'next/image';
import Link from 'next/link';

import WatchButton from './WatchButton';

import { Maker } from '@/types/maker';

import styles from './MakerCard.module.css';

interface MakerCardProps {
  maker: Maker;
}

export default function MakerCard({
  maker,
}: MakerCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <Link
          href={`/makers/${maker.username}`}
          className={styles.avatarLink}
        >
          <Image
            src={maker.avatarUrl}
            alt={`${maker.name} 프로필`}
            width={54}
            height={54}
            className={styles.avatar}
          />
        </Link>

        <WatchButton
          initialCount={maker.subscriberCount}
        />
      </div>

      <div className={styles.identity}>
        <Link
          href={`/makers/${maker.username}`}
          className={styles.name}
        >
          {maker.name}
        </Link>

        <span>{maker.role}</span>

        <p>{maker.bio}</p>
      </div>

      <div className={styles.skills}>
        {maker.skills.slice(0, 4).map(
          (skill) => (
            <span key={skill}>
              {skill}
            </span>
          ),
        )}
      </div>

      <div className={styles.bottom}>
        <span>
          <strong>{maker.projectCount}</strong>
          프로젝트
        </span>

        <span>
          <strong>
            {maker.subscriberCount}
          </strong>
          구독자
        </span>

        {maker.openToProject && (
          <span className={styles.open}>
            프로젝트 참여 가능
          </span>
        )}
      </div>
    </article>
  );
}