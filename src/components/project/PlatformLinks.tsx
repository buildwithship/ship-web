/* eslint-disable @next/next/no-img-element */

import {
  ExternalLink,
} from 'lucide-react';

import {
  ProjectLink,
} from '@/types/project';

import styles from './PlatformLinks.module.css';

interface PlatformLinksProps {
  links: ProjectLink[];
  compact?: boolean;
}

const APP_STORE_BADGE_URL =
  'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83';

const GOOGLE_PLAY_BADGE_URL =
  'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';

export default function PlatformLinks({
  links,
  compact = false,
}: PlatformLinksProps) {
  if (links.length === 0) {
    return null;
  }

  const sortedLinks = [...links].sort(
    (a, b) => {
      const order = {
        appStore: 0,
        googlePlay: 1,
        web: 2,
      };

      return (
        order[a.platform] -
        order[b.platform]
      );
    },
  );

  return (
    <div
      className={`${styles.links} ${
        compact
          ? styles.compact
          : ''
      }`}
    >
      {sortedLinks.map((link) => {
        if (
          link.platform ===
          'appStore'
        ) {
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={
                styles.storeLink
              }
              aria-label="App Store에서 보기"
            >
              <img
                src={
                  APP_STORE_BADGE_URL
                }
                alt="Download on the App Store"
                className={
                  styles.appStoreBadge
                }
              />
            </a>
          );
        }

        if (
          link.platform ===
          'googlePlay'
        ) {
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={
                styles.storeLink
              }
              aria-label="Google Play에서 보기"
            >
              <img
                src={
                  GOOGLE_PLAY_BADGE_URL
                }
                alt="Get it on Google Play"
                className={
                  styles.googlePlayBadge
                }
              />
            </a>
          );
        }

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className={
              styles.websiteLink
            }
          >
            <span>
              Website
            </span>

            <ExternalLink
              size={12}
              strokeWidth={2}
            />
          </a>
        );
      })}
    </div>
  );
}