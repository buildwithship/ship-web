import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.brand}>
          SHIP
        </span>

        <h1>
          만든 프로젝트를 보여주고,
          <br />
          다음 팀을 만나세요.
        </h1>

        <p>
          출시한 앱과 웹서비스를 올리고,
          다른 메이커의 프로젝트를 발견해보세요.
        </p>

        <div className={styles.actions}>
          <Link
            href="/projects"
            className="button button--primary"
          >
            프로젝트 둘러보기
            <ArrowRight size={16} />
          </Link>

          <Link
            href="/projects/new"
            className="button button--secondary"
          >
            프로젝트 올리기
          </Link>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/images/brand/hero-ocean.jpg"
          alt="바다를 항해하는 모습"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 45vw"
          className={styles.image}
        />
      </div>
    </section>
  );
}