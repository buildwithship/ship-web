'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  ImagePlus,
  Plus,
  Trash2,
  Upload,
  UserPlus,
  X,
} from 'lucide-react';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import styles from './ProjectCreateForm.module.css';

interface BannerImage {
  id: string;
  file: File;
  previewUrl: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface PlatformState {
  web: string;
  appStore: string;
  googlePlay: string;
}

const MAX_BANNERS = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const categories = [
  'AI',
  'Productivity',
  'Lifestyle',
  'Community',
  'Education',
  'Finance',
  'Health',
  'Social',
  'Developer Tool',
  'Entertainment',
  'Game',
  'Other',
];

function createId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

export default function ProjectCreateForm() {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  const [category, setCategory] = useState('');

  const [logoFile, setLogoFile] =
    useState<File | null>(null);

  const [logoPreview, setLogoPreview] =
    useState<string | null>(null);

  const [banners, setBanners] = useState<
    BannerImage[]
  >([]);

  const [teamMembers, setTeamMembers] = useState<
    TeamMember[]
  >([
    {
      id: createId(),
      name: '',
      role: '',
    },
  ]);

  const [platforms, setPlatforms] =
    useState<PlatformState>({
      web: '',
      appStore: '',
      googlePlay: '',
    });

  const [isRecruiting, setIsRecruiting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  const hasPlatform = useMemo(() => {
    return Object.values(platforms).some(
      (value) => value.trim().length > 0,
    );
  }, [platforms]);

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }

      banners.forEach((banner) => {
        URL.revokeObjectURL(banner.previewUrl);
      });
    };
  }, [logoPreview, banners]);

  const validateImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('이미지는 10MB 이하만 업로드할 수 있습니다.');
      return false;
    }

    return true;
  };

  const handleLogoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || !validateImage(file)) {
      return;
    }

    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleBannerChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    if (files.length === 0) {
      return;
    }

    const remaining =
      MAX_BANNERS - banners.length;

    const acceptedFiles = files
      .filter(validateImage)
      .slice(0, remaining);

    const newBanners = acceptedFiles.map(
      (file) => ({
        id: createId(),
        file,
        previewUrl: URL.createObjectURL(file),
      }),
    );

    setBanners((prev) => [
      ...prev,
      ...newBanners,
    ]);

    setError(null);

    event.target.value = '';
  };

  const removeBanner = (id: string) => {
    setBanners((prev) => {
      const target = prev.find(
        (banner) => banner.id === id,
      );

      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }

      return prev.filter(
        (banner) => banner.id !== id,
      );
    });
  };

  const moveBannerToFront = (id: string) => {
    setBanners((prev) => {
      const selected = prev.find(
        (banner) => banner.id === id,
      );

      if (!selected) {
        return prev;
      }

      return [
        selected,
        ...prev.filter(
          (banner) => banner.id !== id,
        ),
      ];
    });
  };

  const addTeamMember = () => {
    setTeamMembers((prev) => [
      ...prev,
      {
        id: createId(),
        name: '',
        role: '',
      },
    ]);
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers((prev) =>
      prev.filter(
        (member) => member.id !== id,
      ),
    );
  };

  const updateTeamMember = (
    id: string,
    field: 'name' | 'role',
    value: string,
  ) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              [field]: value,
            }
          : member,
      ),
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitted(false);

    if (name.trim().length < 2) {
      setError(
        '프로젝트 이름을 2자 이상 입력해주세요.',
      );
      return;
    }

    if (tagline.trim().length < 10) {
      setError(
        '한 줄 소개를 10자 이상 입력해주세요.',
      );
      return;
    }

    if (description.trim().length < 20) {
      setError(
        '서비스 소개를 20자 이상 입력해주세요.',
      );
      return;
    }

    if (!category) {
      setError('카테고리를 선택해주세요.');
      return;
    }

    if (!logoFile) {
      setError('프로젝트 로고를 등록해주세요.');
      return;
    }

    if (banners.length === 0) {
      setError(
        '대표 배너 이미지를 최소 1장 등록해주세요.',
      );
      return;
    }

    if (!hasPlatform) {
      setError(
        'Website, App Store, Google Play 중 하나 이상의 링크를 입력해주세요.',
      );
      return;
    }

    const validMembers = teamMembers.filter(
      (member) =>
        member.name.trim() ||
        member.role.trim(),
    );

    const payload = {
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      category,
      platforms,
      isRecruiting,
      teamMembers: validMembers,
      logoFile,
      banners: banners.map(
        (banner) => banner.file,
      ),
    };

    console.log('SHIP project payload', payload);

    setError(null);
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.backButton}
        >
          <ArrowLeft size={17} />
          홈으로
        </Link>

        <div className={styles.heading}>
          <span>SHIP A PROJECT</span>

          <h1>프로젝트 올리기</h1>

          <p>
            만든 서비스를 간단하게 등록하고
            사람들에게 보여주세요.
          </p>
        </div>

        {submitted && (
          <div className={styles.success}>
            프로젝트 정보가 정상적으로
            입력되었습니다. 현재는 프론트엔드
            단계라 실제 서버 저장은 아직
            연결되지 않았습니다.
          </div>
        )}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>01</span>

              <div>
                <h2>기본 정보</h2>
                <p>
                  프로젝트를 가장 잘 설명하는
                  정보만 입력해주세요.
                </p>
              </div>
            </div>

            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.label}>
                  프로젝트 이름
                  <span>필수</span>
                </div>

                <input
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="예: PAIR"
                  maxLength={40}
                />

                <div className={styles.counter}>
                  {name.length}/40
                </div>
              </label>

              <label className={styles.field}>
                <div className={styles.label}>
                  한 줄 소개
                  <span>필수</span>
                </div>

                <input
                  value={tagline}
                  onChange={(event) =>
                    setTagline(event.target.value)
                  }
                  placeholder="프로젝트를 한 문장으로 소개해주세요."
                  maxLength={100}
                />

                <div className={styles.counter}>
                  {tagline.length}/100
                </div>
              </label>

              <label className={styles.field}>
                <div className={styles.label}>
                  서비스 소개
                  <span>필수</span>
                </div>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value,
                    )
                  }
                  placeholder="어떤 서비스인지 간단하게 소개해주세요."
                  maxLength={1500}
                  rows={6}
                />

                <div className={styles.counter}>
                  {description.length}/1500
                </div>
              </label>

              <label className={styles.field}>
                <div className={styles.label}>
                  카테고리
                  <span>필수</span>
                </div>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value,
                    )
                  }
                >
                  <option value="">
                    카테고리 선택
                  </option>

                  {categories.map(
                    (categoryItem) => (
                      <option
                        key={categoryItem}
                        value={categoryItem}
                      >
                        {categoryItem}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>02</span>

              <div>
                <h2>이미지</h2>
                <p>
                  실제 프로젝트 로고와 배너
                  이미지를 등록해주세요.
                </p>
              </div>
            </div>

            <div className={styles.imageFields}>
              <div className={styles.imageField}>
                <div className={styles.label}>
                  프로젝트 로고
                  <span>필수</span>
                </div>

                <label
                  className={
                    styles.logoUploader
                  }
                >
                  {logoPreview ? (
                    <>
                      <Image
                        src={logoPreview}
                        alt="프로젝트 로고 미리보기"
                        fill
                        unoptimized
                        className={
                          styles.logoPreview
                        }
                      />

                      <div
                        className={
                          styles.changeOverlay
                        }
                      >
                        <Upload size={17} />
                        변경
                      </div>
                    </>
                  ) : (
                    <div
                      className={
                        styles.uploadPlaceholder
                      }
                    >
                      <ImagePlus size={22} />
                      <strong>로고 등록</strong>
                      <span>
                        정사각형 이미지 권장
                      </span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    hidden
                    onChange={handleLogoChange}
                  />
                </label>
              </div>

              <div className={styles.imageField}>
                <div className={styles.label}>
                  프로젝트 배너
                  <span>필수</span>
                </div>

                <p className={styles.help}>
                  첫 번째 이미지가 대표
                  배너로 사용됩니다. 최대 6장.
                </p>

                <div className={styles.bannerGrid}>
                  {banners.map(
                    (banner, index) => (
                      <div
                        key={banner.id}
                        className={
                          styles.bannerItem
                        }
                      >
                        <Image
                          src={
                            banner.previewUrl
                          }
                          alt={`배너 ${index + 1}`}
                          fill
                          unoptimized
                          className={
                            styles.bannerPreview
                          }
                        />

                        {index === 0 && (
                          <span
                            className={
                              styles.mainBadge
                            }
                          >
                            대표
                          </span>
                        )}

                        <div
                          className={
                            styles.bannerActions
                          }
                        >
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                moveBannerToFront(
                                  banner.id,
                                )
                              }
                            >
                              대표로
                            </button>
                          )}

                          <button
                            type="button"
                            aria-label="배너 삭제"
                            onClick={() =>
                              removeBanner(
                                banner.id,
                              )
                            }
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>
                    ),
                  )}

                  {banners.length <
                    MAX_BANNERS && (
                    <label
                      className={
                        styles.bannerUploader
                      }
                    >
                      <Plus size={22} />

                      <span>이미지 추가</span>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        multiple
                        hidden
                        onChange={
                          handleBannerChange
                        }
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>03</span>

              <div>
                <h2>서비스 링크</h2>

                <p>
                  실제 프로젝트를 확인할 수 있는
                  링크를 등록해주세요.
                </p>
              </div>
            </div>

            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.label}>
                  Website
                </div>

                <div
                  className={
                    styles.inputWithIcon
                  }
                >
                  <ExternalLink size={17} />

                  <input
                    type="url"
                    value={platforms.web}
                    onChange={(event) =>
                      setPlatforms(
                        (prev) => ({
                          ...prev,
                          web: event.target.value,
                        }),
                      )
                    }
                    placeholder="https://..."
                  />
                </div>
              </label>

              <label className={styles.field}>
                <div className={styles.label}>
                  App Store
                </div>

                <input
                  type="url"
                  value={
                    platforms.appStore
                  }
                  onChange={(event) =>
                    setPlatforms(
                      (prev) => ({
                        ...prev,
                        appStore:
                          event.target.value,
                      }),
                    )
                  }
                  placeholder="https://apps.apple.com/..."
                />
              </label>

              <label className={styles.field}>
                <div className={styles.label}>
                  Google Play
                </div>

                <input
                  type="url"
                  value={
                    platforms.googlePlay
                  }
                  onChange={(event) =>
                    setPlatforms(
                      (prev) => ({
                        ...prev,
                        googlePlay:
                          event.target.value,
                      }),
                    )
                  }
                  placeholder="https://play.google.com/..."
                />
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>04</span>

              <div>
                <h2>함께 만든 사람</h2>

                <p>
                  팀 프로젝트라면 참여한
                  사람과 역할을 추가해주세요.
                </p>
              </div>
            </div>

            <div className={styles.teamList}>
              {teamMembers.map(
                (member, index) => (
                  <div
                    key={member.id}
                    className={
                      styles.teamMember
                    }
                  >
                    <div
                      className={
                        styles.memberNumber
                      }
                    >
                      {index + 1}
                    </div>

                    <input
                      value={member.name}
                      onChange={(event) =>
                        updateTeamMember(
                          member.id,
                          'name',
                          event.target.value,
                        )
                      }
                      placeholder="이름 또는 닉네임"
                    />

                    <input
                      value={member.role}
                      onChange={(event) =>
                        updateTeamMember(
                          member.id,
                          'role',
                          event.target.value,
                        )
                      }
                      placeholder="역할 예: Frontend"
                    />

                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        className={
                          styles.removeMember
                        }
                        aria-label="팀원 삭제"
                        onClick={() =>
                          removeTeamMember(
                            member.id,
                          )
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>

            <button
              type="button"
              className={styles.addMember}
              onClick={addTeamMember}
            >
              <UserPlus size={17} />
              참여 인원 추가
            </button>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>
              <span>05</span>

              <div>
                <h2>팀원 모집</h2>

                <p>
                  이 프로젝트와 함께할 새로운
                  크루를 찾고 있다면 켜주세요.
                </p>
              </div>
            </div>

            <label className={styles.toggleRow}>
              <div>
                <strong>
                  팀원 모집 중으로 표시
                </strong>

                <span>
                  프로젝트 카드와 상세 화면에
                  모집 상태가 표시됩니다.
                </span>
              </div>

              <input
                type="checkbox"
                checked={isRecruiting}
                onChange={(event) =>
                  setIsRecruiting(
                    event.target.checked,
                  )
                }
              />

              <span
                className={
                  styles.toggleSwitch
                }
              />
            </label>
          </section>

          <div className={styles.submitArea}>
            <div>
              <strong>
                프로젝트를 세상에
                내보낼 준비가 됐나요?
              </strong>

              <span>
                등록 후에도 프로젝트 정보는
                수정할 수 있습니다.
              </span>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              SHIP 프로젝트
              <Upload size={17} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}