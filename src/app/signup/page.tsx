'use client';

import Link from 'next/link';

import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRound,
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

export default function SignupPage() {
  const router =
    useRouter();

  const { signup } =
    useAuth();

  const [name, setName] =
    useState('');

  const [
    username,
    setUsername,
  ] = useState('');

  const [email, setEmail] =
    useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
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

    const normalizedUsername =
      username
        .trim()
        .replace(/^@/, '')
        .toLowerCase();

    if (
      !name.trim() ||
      !normalizedUsername ||
      !email.trim() ||
      !password
    ) {
      setError(
        '모든 항목을 입력해주세요.',
      );

      return;
    }

    if (
      !/^[a-z0-9._]+$/.test(
        normalizedUsername,
      )
    ) {
      setError(
        '사용자 이름은 영문 소문자, 숫자, 점, 밑줄만 사용할 수 있습니다.',
      );

      return;
    }

    if (
      normalizedUsername.length <
        3 ||
      normalizedUsername.length >
        20
    ) {
      setError(
        '사용자 이름은 3~20자로 입력해주세요.',
      );

      return;
    }

    if (password.length < 8) {
      setError(
        '비밀번호는 8자 이상이어야 합니다.',
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        '비밀번호가 일치하지 않습니다.',
      );

      return;
    }

    setLoading(true);
    setError('');

    try {
      await signup({
        name: name.trim(),
        username:
          normalizedUsername,
        email:
          email.trim(),
        password,
      });

      router.replace(
        getNextPath(),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : '회원가입에 실패했습니다.',
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
            <h1>
              SHIP 시작하기
            </h1>

            <p>
              프로젝트를 공개하고,
              다른 메이커와 연결해보세요.
            </p>
          </header>

          <form
            className={styles.form}
            onSubmit={
              handleSubmit
            }
          >
            <label
              className={
                styles.field
              }
            >
              <span>
                닉네임
              </span>

              <div
                className={
                  styles.inputWrap
                }
              >
                <UserRound
                  size={18}
                />

                <input
                  value={name}
                  onChange={(
                    event,
                  ) =>
                    setName(
                      event.target
                        .value,
                    )
                  }
                  placeholder="SHIP에서 사용할 이름"
                  maxLength={20}
                />
              </div>
            </label>

            <label
              className={
                styles.field
              }
            >
              <span>
                사용자 이름
              </span>

              <div
                className={
                  styles.inputWrap
                }
              >
                <AtSign
                  size={18}
                />

                <input
                  value={username}
                  onChange={(
                    event,
                  ) =>
                    setUsername(
                      event.target
                        .value,
                    )
                  }
                  placeholder="username"
                  autoCapitalize="none"
                  maxLength={20}
                />
              </div>

              <small>
                프로필 주소에 사용됩니다.
              </small>
            </label>

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
                  placeholder="8자 이상"
                  autoComplete="new-password"
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

            <label
              className={
                styles.field
              }
            >
              <span>
                비밀번호 확인
              </span>

              <div
                className={
                  styles.inputWrap
                }
              >
                <Lock
                  size={18}
                />

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event,
                  ) =>
                    setConfirmPassword(
                      event.target
                        .value,
                    )
                  }
                  placeholder="비밀번호 다시 입력"
                  autoComplete="new-password"
                />
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
                ? '가입 중...'
                : '가입하기'}

              {!loading && (
                <ArrowRight
                  size={17}
                />
              )}
            </button>
          </form>

          <footer
            className={
              styles.footer
            }
          >
            이미 계정이 있나요?

            <Link href="/login">
              로그인
            </Link>
          </footer>
        </section>
      </div>
    </main>
  );
}