'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from 'lucide-react';

import {
  FormEvent,
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  useAuth,
} from '@/contexts/AuthContext';

import styles from './page.module.css';

function ShipMark() {
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

function getNextPath() {
  if (
    typeof window === 'undefined'
  ) {
    return '/';
  }

  const params =
    new URLSearchParams(
      window.location.search,
    );

  const next =
    params.get('next');

  if (
    !next ||
    !next.startsWith('/') ||
    next.startsWith('//')
  ) {
    return '/';
  }

  return next;
}

export default function LoginPage() {
  const router =
    useRouter();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleSubmit = async (
    event: FormEvent,
  ) => {
    event.preventDefault();

    if (
      !email.trim() ||
      !password
    ) {
      setError(
        '이메일과 비밀번호를 입력해주세요.',
      );

      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(
        email,
        password,
      );

      router.replace(
        getNextPath(),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '로그인에 실패했습니다.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div
        className={
          styles.container
        }
      >
        <Link
          href="/"
          className={styles.brand}
        >
          <span
            className={styles.logo}
          >
            <ShipMark />
          </span>

          <strong>
            SHIP
          </strong>
        </Link>

        <section
          className={styles.card}
        >
          <header
            className={
              styles.header
            }
          >
            <h1>로그인</h1>

            <p>
              프로젝트와 메이커를
              계속 탐색해보세요.
            </p>
          </header>

          <form
            onSubmit={
              handleSubmit
            }
            className={styles.form}
          >
            <label
              className={
                styles.field
              }
            >
              <span>
                이메일
              </span>

              <div
                className={
                  styles.inputWrap
                }
              >
                <Mail
                  size={18}
                  strokeWidth={2}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(
                    event,
                  ) =>
                    setEmail(
                      event.target
                        .value,
                    )
                  }
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              </div>
            </label>

            <label
              className={
                styles.field
              }
            >
              <span>
                비밀번호
              </span>

              <div
                className={
                  styles.inputWrap
                }
              >
                <Lock
                  size={18}
                  strokeWidth={2}
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event.target
                        .value,
                    )
                  }
                  placeholder="비밀번호"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className={
                    styles.passwordToggle
                  }
                  onClick={() =>
                    setShowPassword(
                      (prev) =>
                        !prev,
                    )
                  }
                  aria-label={
                    showPassword
                      ? '비밀번호 숨기기'
                      : '비밀번호 보기'
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={17}
                    />
                  ) : (
                    <Eye
                      size={17}
                    />
                  )}
                </button>
              </div>
            </label>

            {error && (
              <p
                className={
                  styles.error
                }
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className={
                styles.submit
              }
              disabled={loading}
            >
              {loading
                ? '로그인 중...'
                : '로그인'}

              {!loading && (
                <ArrowRight
                  size={17}
                />
              )}
            </button>
          </form>

          <div
            className={
              styles.demo
            }
          >
            <span>
              개발용 계정
            </span>

            <strong>
              demo@ship.dev
            </strong>

            <code>
              12345678
            </code>
          </div>

          <footer
            className={
              styles.footer
            }
          >
            아직 계정이 없나요?

            <Link href="/signup">
              가입하기
            </Link>
          </footer>
        </section>
      </div>
    </main>
  );
}