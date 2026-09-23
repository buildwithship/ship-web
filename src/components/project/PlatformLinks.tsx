import {
  Globe2,
} from 'lucide-react';

import { ProjectLink } from '@/types/project';

import styles from './PlatformLinks.module.css';

interface PlatformLinksProps {
  links: ProjectLink[];
}

const APP_STORE_BADGE_URL =
  'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83';

const GOOGLE_PLAY_BADGE_URL =
  'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';

const platformOrder: Record<
  ProjectLink['platform'],
  number
> = {
  appStore: 0,
  googlePlay: 1,
  web: 2,
};

export default function PlatformLinks({
  links,
}: PlatformLinksProps) {
  if (links.length === 0) {
    return null;
  }

  const sortedLinks = [...links].sort(
    (a, b) =>
      platformOrder[a.platform] -
      platformOrder[b.platform],
  );

  return (
    <div className={styles.links}>
      {sortedLinks.map((link) => {
        if (link.platform === 'appStore') {
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={styles.storeLink}
              aria-label="App Store에서 다운로드"
            >
              <span
                className={
                  styles.appStoreFrame
                }
              >
                <img
                  src={APP_STORE_BADGE_URL}
                  alt="Download on the App Store"
                  className={
                    styles.appStoreBadge
                  }
                />
              </span>
            </a>
          );
        }

        if (link.platform === 'googlePlay') {
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={styles.storeLink}
              aria-label="Google Play에서 다운로드"
            >
              <span
                className={
                  styles.googlePlayFrame
                }
              >
                <img
                  src={GOOGLE_PLAY_BADGE_URL}
                  alt="Get it on Google Play"
                  className={
                    styles.googlePlayBadge
                  }
                />
              </span>
            </a>
          );
        }

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={styles.website}
            aria-label="웹사이트 열기"
          >
            <span
              className={
                styles.websiteIcon
              }
            >
              <Globe2
                size={18}
                strokeWidth={2.2}
              />
            </span>

            <span>Website</span>
          </a>
        );
      })}
    </div>
  );
}