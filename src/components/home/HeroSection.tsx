import {
  ArrowRight,
  Compass,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__eyebrow">
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
          <br className="desktop-break" />
          다음 프로젝트를 함께할 사람과 연결되어 보세요.
        </p>

        <div className="hero__actions">
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

      <div className="hero-voyage" aria-hidden="true">
        <div className="hero-voyage__route">
          <span className="route-point route-point--one" />
          <span className="route-point route-point--two" />
          <span className="route-point route-point--three" />

          <svg
            className="route-line"
            viewBox="0 0 520 260"
            fill="none"
          >
            <path
              d="M20 213C123 205 119 93 222 106C307 117 326 196 409 153C447 133 466 86 503 47"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="7 8"
            />
          </svg>

          <div className="voyage-card voyage-card--primary">
            <div className="voyage-card__header">
              <span>NEW PROJECT</span>
              <span>01</span>
            </div>

            <div className="voyage-card__logo">
              S
            </div>

            <strong>Ready to ship.</strong>
            <p>새로운 프로젝트가 항해를 시작합니다.</p>
          </div>

          <div className="voyage-card voyage-card--secondary">
            <span>OPEN FOR CREW</span>
            <strong>Find your next crew.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}