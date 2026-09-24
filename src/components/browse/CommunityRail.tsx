'use client';

import {
  AtSign,
  MailQuestion,
  MessageCircleMore,
  Send,
  X,
} from 'lucide-react';

import {
  useState,
} from 'react';

import styles from './CommunityRail.module.css';

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CommunityRail() {
  const [
    inquiryOpen,
    setInquiryOpen,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState('');

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const handleSubmit = () => {
    if (
      message.trim().length < 5
    ) {
      return;
    }

    console.log({
      message,
    });

    setSubmitted(true);
    setMessage('');
  };

  return (
    <>
      <section
        className={styles.section}
      >
        <div
          className={styles.header}
        >
          <strong>
            SHIP 채널
          </strong>

          <span>
            FOLLOW
          </span>
        </div>

        <div
          className={styles.links}
        >
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className={
              styles.instagram
            }
          >
            <span
              className={
                styles.icon
              }
            >
              <InstagramIcon />
            </span>

            <div>
              <strong>
                Instagram
              </strong>

              <small>
                인스타그램
              </small>
            </div>
          </a>

          <a
            href="https://www.threads.net/"
            target="_blank"
            rel="noreferrer"
            className={
              styles.threads
            }
          >
            <span
              className={
                styles.icon
              }
            >
              <AtSign
                size={18}
                strokeWidth={2.1}
              />
            </span>

            <div>
              <strong>
                Threads
              </strong>

              <small>
                쓰레드
              </small>
            </div>
          </a>

          <a
            href="https://www.kakao.com/"
            target="_blank"
            rel="noreferrer"
            className={
              styles.kakao
            }
          >
            <span
              className={
                styles.icon
              }
            >
              <MessageCircleMore
                size={18}
                strokeWidth={2}
              />
            </span>

            <div>
              <strong>
                KakaoTalk
              </strong>

              <small>
                카카오톡
              </small>
            </div>
          </a>

          <button
            type="button"
            className={
              styles.inquiry
            }
            onClick={() => {
              setInquiryOpen(true);
              setSubmitted(false);
            }}
          >
            <span
              className={
                styles.icon
              }
            >
              <MailQuestion
                size={18}
                strokeWidth={2}
              />
            </span>

            <div>
              <strong>
                문의함
              </strong>

              <small>
                의견 보내기
              </small>
            </div>
          </button>
        </div>
      </section>

      {inquiryOpen && (
        <div
          className={
            styles.overlay
          }
          onMouseDown={() =>
            setInquiryOpen(false)
          }
        >
          <div
            className={
              styles.modal
            }
            onMouseDown={(
              event,
            ) =>
              event.stopPropagation()
            }
          >
            <div
              className={
                styles.modalHeader
              }
            >
              <div>
                <strong>
                  SHIP 문의함
                </strong>

                <span>
                  서비스에 대한 의견을
                  보내주세요.
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setInquiryOpen(false)
                }
                aria-label="닫기"
              >
                <X
                  size={18}
                  strokeWidth={2}
                />
              </button>
            </div>

            {submitted ? (
              <div
                className={
                  styles.complete
                }
              >
                <strong>
                  접수되었습니다.
                </strong>

                <p>
                  의견을 확인한 뒤
                  서비스 개선에
                  참고하겠습니다.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setInquiryOpen(false)
                  }
                >
                  닫기
                </button>
              </div>
            ) : (
              <>
                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target.value,
                    )
                  }
                  placeholder="불편한 점이나 제안하고 싶은 내용을 작성해주세요."
                  maxLength={500}
                />

                <div
                  className={
                    styles.modalBottom
                  }
                >
                  <span>
                    {message.length}/500
                  </span>

                  <button
                    type="button"
                    disabled={
                      message.trim()
                        .length < 5
                    }
                    onClick={
                      handleSubmit
                    }
                  >
                    <Send
                      size={14}
                      strokeWidth={2}
                    />

                    보내기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}