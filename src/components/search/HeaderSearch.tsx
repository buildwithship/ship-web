'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowRight,
  FolderKanban,
  Search,
  UserRound,
  X,
} from 'lucide-react';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { makers } from '@/mocks/makers';
import { projects } from '@/mocks/projects';

import styles from './HeaderSearch.module.css';

export default function HeaderSearch() {
  const [keyword, setKeyword] =
    useState('');

  const [open, setOpen] =
    useState(false);

  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const rootRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const normalizedKeyword =
    keyword
      .trim()
      .toLowerCase();

  const projectResults =
    useMemo(() => {
      if (!normalizedKeyword) {
        return [];
      }

      return projects
        .filter((project) => {
          const searchableText = [
            project.name,
            project.tagline,
            project.description,
            ...project.categories,
            project.maker.name,
          ]
            .join(' ')
            .toLowerCase();

          return searchableText.includes(
            normalizedKeyword,
          );
        })
        .slice(0, 4);
    }, [normalizedKeyword]);

  const makerResults =
    useMemo(() => {
      if (!normalizedKeyword) {
        return [];
      }

      return makers
        .filter((maker) => {
          const searchableText = [
            maker.name,
            maker.username,
            maker.role,
            maker.bio,
            ...maker.skills,
          ]
            .join(' ')
            .toLowerCase();

          return searchableText.includes(
            normalizedKeyword,
          );
        })
        .slice(0, 4);
    }, [normalizedKeyword]);

  const totalResults =
    projectResults.length +
    makerResults.length;

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const isShortcut =
        (
          event.metaKey ||
          event.ctrlKey
        ) &&
        event.key.toLowerCase() ===
          'k';

      if (isShortcut) {
        event.preventDefault();

        inputRef.current?.focus();

        setOpen(true);
      }

      if (
        event.key === 'Escape'
      ) {
        setOpen(false);

        inputRef.current?.blur();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = (
      event: MouseEvent,
    ) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    };

    window.addEventListener(
      'mousedown',
      handleMouseDown,
    );

    return () => {
      window.removeEventListener(
        'mousedown',
        handleMouseDown,
      );
    };
  }, []);

  const handleResultClick =
    () => {
      setKeyword('');
      setOpen(false);
    };

  return (
    <div
      ref={rootRef}
      className={styles.root}
    >
      <div
        className={`${styles.searchBox} ${
          open
            ? styles.searchBoxOpen
            : ''
        }`}
      >
        <Search
          size={17}
          strokeWidth={2}
        />

        <input
          ref={inputRef}
          type="search"
          value={keyword}
          onFocus={() =>
            setOpen(true)
          }
          onChange={(event) => {
            setKeyword(
              event.target.value,
            );

            setOpen(true);
          }}
          placeholder="프로젝트, 메이커 검색"
          aria-label="통합 검색"
          autoComplete="off"
        />

        {keyword ? (
          <button
            type="button"
            className={
              styles.clearButton
            }
            onClick={() => {
              setKeyword('');

              inputRef.current?.focus();
            }}
            aria-label="검색어 지우기"
          >
            <X
              size={15}
              strokeWidth={2}
            />
          </button>
        ) : (
          <kbd>
            Ctrl K
          </kbd>
        )}
      </div>

      {open && (
        <div
          className={
            styles.dropdown
          }
        >
          {!normalizedKeyword ? (
            <div
              className={
                styles.initial
              }
            >
              <div
                className={
                  styles.initialIcon
                }
              >
                <Search
                  size={19}
                  strokeWidth={2}
                />
              </div>

              <div>
                <strong>
                  SHIP에서 검색
                </strong>

                <p>
                  프로젝트 이름, 분야,
                  메이커 이름으로
                  검색할 수 있습니다.
                </p>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div
              className={
                styles.empty
              }
            >
              <Search
                size={22}
                strokeWidth={1.8}
              />

              <strong>
                검색 결과가 없어요
              </strong>

              <p>
                다른 검색어를
                입력해보세요.
              </p>
            </div>
          ) : (
            <>
              {projectResults.length >
                0 && (
                <section
                  className={
                    styles.group
                  }
                >
                  <div
                    className={
                      styles.groupHeader
                    }
                  >
                    <div>
                      <FolderKanban
                        size={14}
                      />

                      <span>
                        프로젝트
                      </span>
                    </div>

                    <span>
                      {
                        projectResults.length
                      }
                    </span>
                  </div>

                  <div
                    className={
                      styles.results
                    }
                  >
                    {projectResults.map(
                      (project) => (
                        <Link
                          key={
                            project.id
                          }
                          href={`/projects/${project.slug}`}
                          className={
                            styles.result
                          }
                          onClick={
                            handleResultClick
                          }
                        >
                          <Image
                            src={
                              project.logoUrl
                            }
                            alt={`${project.name} 로고`}
                            width={42}
                            height={42}
                            className={
                              styles.projectImage
                            }
                          />

                          <div
                            className={
                              styles.resultContent
                            }
                          >
                            <strong>
                              {
                                project.name
                              }
                            </strong>

                            <p>
                              {
                                project.tagline
                              }
                            </p>

                            <div
                              className={
                                styles.tags
                              }
                            >
                              {project.categories
                                .slice(
                                  0,
                                  2,
                                )
                                .map(
                                  (
                                    category,
                                  ) => (
                                    <span
                                      key={
                                        category
                                      }
                                    >
                                      {
                                        category
                                      }
                                    </span>
                                  ),
                                )}
                            </div>
                          </div>

                          <ArrowRight
                            size={16}
                            strokeWidth={2}
                            className={
                              styles.arrow
                            }
                          />
                        </Link>
                      ),
                    )}
                  </div>
                </section>
              )}

              {makerResults.length >
                0 && (
                <section
                  className={
                    styles.group
                  }
                >
                  <div
                    className={
                      styles.groupHeader
                    }
                  >
                    <div>
                      <UserRound
                        size={14}
                      />

                      <span>
                        메이커
                      </span>
                    </div>

                    <span>
                      {
                        makerResults.length
                      }
                    </span>
                  </div>

                  <div
                    className={
                      styles.results
                    }
                  >
                    {makerResults.map(
                      (maker) => (
                        <Link
                          key={
                            maker.username
                          }
                          href={`/makers/${maker.username}`}
                          className={
                            styles.result
                          }
                          onClick={
                            handleResultClick
                          }
                        >
                          <Image
                            src={
                              maker.avatarUrl
                            }
                            alt={
                              maker.name
                            }
                            width={42}
                            height={42}
                            className={
                              styles.makerImage
                            }
                          />

                          <div
                            className={
                              styles.resultContent
                            }
                          >
                            <div
                              className={
                                styles.makerNameRow
                              }
                            >
                              <strong>
                                {
                                  maker.name
                                }
                              </strong>

                              <span>
                                @
                                {
                                  maker.username
                                }
                              </span>
                            </div>

                            <p>
                              {
                                maker.role
                              }
                            </p>

                            <div
                              className={
                                styles.tags
                              }
                            >
                              {maker.skills
                                .slice(
                                  0,
                                  2,
                                )
                                .map(
                                  (
                                    skill,
                                  ) => (
                                    <span
                                      key={
                                        skill
                                      }
                                    >
                                      {
                                        skill
                                      }
                                    </span>
                                  ),
                                )}
                            </div>
                          </div>

                          <ArrowRight
                            size={16}
                            strokeWidth={2}
                            className={
                              styles.arrow
                            }
                          />
                        </Link>
                      ),
                    )}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}