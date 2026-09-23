import Image from 'next/image';

import { ArrowRight, Compass } from 'lucide-react';

import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <Compass size={15} strokeWidth={2} />
          DISCOVER WHAT PEOPLE SHIP
        </div>

        <h1>
          Build.
          <br />
          Ship.
          <br />
          <span>Connect.</span>
        </h1>

        <p>
          사람들이 만든 새로운 프로젝트를 발견하고,
          <br />
          다음 프로젝트를 함께할 사람과 연결되어 보세요.
        </p>

        <div className={styles.actions}>
          <a
            href="#projects"
            className="button button--primary button--large"
          >
            프로젝트 둘러보기
            <ArrowRight size={18} strokeWidth={2} />
          </a>

          <a
            href="#open-crew"
            className="button button--secondary button--large"
          >
            팀원 모집 보기
          </a>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/images/brand/hero-ocean.jpg"
          alt="SHIP 항해 이미지"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.image}
        />

        <div className={styles.imageLabel}>
          <span>SHIP</span>
          <strong>Start your next voyage.</strong>
        </div>
      </div>
    </section>
  );
}