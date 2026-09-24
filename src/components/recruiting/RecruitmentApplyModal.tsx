'use client';

import Image from 'next/image';
import {
  Check,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import {
  Recruitment,
  RecruitmentRole,
} from '@/types/recruitment';

import styles from './RecruitmentApplyModal.module.css';

interface RecruitmentApplyModalProps {
  recruitment: Recruitment;
  open: boolean;
  onClose: () => void;
}

export default function RecruitmentApplyModal({
  recruitment,
  open,
  onClose,
}: RecruitmentApplyModalProps) {
  const [role, setRole] =
    useState<RecruitmentRole>(
      recruitment.positions[0]?.role ??
        'Frontend',
    );

  const [message, setMessage] =
    useState('');

  const [portfolioUrl, setPortfolioUrl] =
    useState('');

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow =
      'hidden';

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow = '';

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setRole(
        recruitment.positions[0]?.role ??
          'Frontend',
      );

      setMessage('');
      setPortfolioUrl('');
      setSubmitted(false);
    }
  }, [open, recruitment]);

  if (!open) {
    return null;
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      message.trim().length < 10
    ) {
      return;
    }

    const payload = {
      projectSlug:
        recruitment.projectSlug,
      projectName:
        recruitment.projectName,
      role,
      message: message.trim(),
      portfolioUrl:
        portfolioUrl.trim() ||
        null,
    };

    console.log(
      'SHIP recruitment application',
      payload,
    );

    setSubmitted(true);
  };

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`${recruitment.projectName} 지원하기`}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="닫기"
        >
          <X
            size={20}
            strokeWidth={2}
          />
        </button>

        {submitted ? (
          <div
            className={
              styles.complete
            }
          >
            <div
              className={
                styles.completeIcon
              }
            >
              <Check
                size={27}
                strokeWidth={2.4}
              />
            </div>

            <h2>
              지원이 완료됐어요
            </h2>

            <p>
              {recruitment.projectName}{' '}
              팀에 지원 내용을
              전달했습니다.
            </p>

            <div
              className={
                styles.completeInfo
              }
            >
              <span>지원 포지션</span>

              <strong>
                {role}
              </strong>
            </div>

            <button
              type="button"
              className={
                styles.completeButton
              }
              onClick={onClose}
            >
              확인
            </button>
          </div>
        ) : (
          <>
            <header
              className={
                styles.header
              }
            >
              <Image
                src={
                  recruitment.projectLogoUrl
                }
                alt={`${recruitment.projectName} 로고`}
                width={52}
                height={52}
                className={
                  styles.logo
                }
              />

              <div>
                <span>
                  {recruitment.projectName}
                </span>

                <h2>
                  프로젝트에 지원하기
                </h2>
              </div>
            </header>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <div
                className={
                  styles.field
                }
              >
                <label>
                  지원 포지션
                </label>

                <div
                  className={
                    styles.roles
                  }
                >
                  {recruitment.positions.map(
                    (position) => (
                      <button
                        key={
                          position.role
                        }
                        type="button"
                        className={
                          role ===
                          position.role
                            ? styles.activeRole
                            : undefined
                        }
                        onClick={() =>
                          setRole(
                            position.role,
                          )
                        }
                      >
                        <strong>
                          {
                            position.role
                          }
                        </strong>

                        <span>
                          {
                            position.count
                          }
                          명 모집
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div
                className={
                  styles.profileNotice
                }
              >
                <Image
                  src="/images/makers/uptomaster.jpg"
                  alt="내 프로필"
                  width={38}
                  height={38}
                />

                <div>
                  <strong>
                    내 SHIP 프로필로
                    지원합니다
                  </strong>

                  <span>
                    이름, 활동 프로젝트와
                    프로필 정보가 함께
                    전달됩니다.
                  </span>
                </div>
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="application-message"
                >
                  팀에게 전할 말
                  <span>필수</span>
                </label>

                <textarea
                  id="application-message"
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target
                        .value,
                    )
                  }
                  maxLength={500}
                  rows={6}
                  placeholder="어떤 경험이 있고, 왜 이 프로젝트에 함께하고 싶은지 간단하게 적어주세요."
                />

                <div
                  className={
                    styles.counter
                  }
                >
                  {message.length}/500
                </div>
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="portfolio-url"
                >
                  포트폴리오 링크
                  <span>선택</span>
                </label>

                <div
                  className={
                    styles.urlInput
                  }
                >
                  <ExternalLink
                    size={17}
                    strokeWidth={2}
                  />

                  <input
                    id="portfolio-url"
                    type="url"
                    value={
                      portfolioUrl
                    }
                    onChange={(event) =>
                      setPortfolioUrl(
                        event.target
                          .value,
                      )
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div
                className={
                  styles.actions
                }
              >
                <button
                  type="button"
                  className={
                    styles.cancelButton
                  }
                  onClick={onClose}
                >
                  취소
                </button>

                <button
                  type="submit"
                  className={
                    styles.submitButton
                  }
                  disabled={
                    message.trim()
                      .length < 10
                  }
                >
                  지원하기
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}