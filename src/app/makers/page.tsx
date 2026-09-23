import MakerCard from '@/components/maker/MakerCard';

import { makers } from '@/mocks/makers';

export default function MakersPage() {
  return (
    <main className="content-page">
      <header className="page-heading-block">
        <span>메이커</span>

        <h1>만드는 사람들</h1>

        <p>
          프로젝트 뒤에 있는 사람을
          발견하고 구독해보세요.
        </p>
      </header>

      <div className="filter-row">
        <button className="filter-active">
          전체
        </button>

        <button>Frontend</button>
        <button>Backend</button>
        <button>Design</button>
        <button>PM</button>
      </div>

      <div className="maker-grid">
        {makers.map((maker) => (
          <MakerCard
            key={maker.username}
            maker={maker}
          />
        ))}
      </div>
    </main>
  );
}