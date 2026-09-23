'use client';

import {
  FormEvent,
  useState,
} from 'react';

import {
  CheckCircle2,
  Send,
} from 'lucide-react';

import styles from './FeedbackForm.module.css';

type FeedbackCategory =
  | '서비스 건의'
  | '오류 제보'
  | '프로젝트 신고'
  | '제휴 문의'
  | '기타';

const categories: FeedbackCategory[] = [
  '서비스 건의',
  '오류 제보',
  '프로젝트 신고',
  '제휴 문의',
  '기타',
];

export default function FeedbackForm() {
  const [category, setCategory] =
    useState<FeedbackCategory>(
      '서비스 건의',
    );

  const [message, setMessage] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [submitted, setSubmitted] =
    useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      message.trim().length < 10
    ) {
      return;
    }

    console.log({
      category,
      message:
        message.trim(),
      email:
        email.trim(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
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
          <CheckCircle2
            size={28}
          />
        </div>

        <h2>
          의견이 전달됐어요
        </h2>

        <p>
          보내주신 의견을
          확인하고 SHIP을
          개선하는 데
          참고하겠습니다.
        </p>

        <button
          type="button"
          onClick={() => {
            setMessage('');
            setEmail('');
            setSubmitted(
              false,
            );
          }}
        >
          다른 의견 보내기
        </button>
      </div>
    );
  }

  return (
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
          어떤 의견인가요?
        </label>

        <div
          className={
            styles.categories
          }
        >
          {categories.map(
            (item) => (
              <button
                key={item}
                type="button"
                className={
                  category ===
                  item
                    ? styles.active
                    : undefined
                }
                onClick={() =>
                  setCategory(
                    item,
                  )
                }
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>

      <div
        className={
          styles.field
        }
      >
        <label
          htmlFor="feedback-message"
        >
          내용
        </label>

        <textarea
          id="feedback-message"
          value={message}
          onChange={(
            event,
          ) =>
            setMessage(
              event.target
                .value,
            )
          }
          placeholder="불편했던 점이나 추가되었으면 하는 기능을 자유롭게 적어주세요."
          maxLength={1500}
          rows={8}
        />

        <div
          className={
            styles.counter
          }
        >
          {message.length}
          /1500
        </div>
      </div>

      <div
        className={
          styles.field
        }
      >
        <label
          htmlFor="feedback-email"
        >
          답변 받을 이메일
          <span>
            선택
          </span>
        </label>

        <input
          id="feedback-email"
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
        />
      </div>

      <button
        type="submit"
        className={
          styles.submit
        }
        disabled={
          message.trim()
            .length < 10
        }
      >
        보내기

        <Send
          size={17}
          strokeWidth={2}
        />
      </button>
    </form>
  );
}