import { Globe2 } from 'lucide-react';
import { ProjectLink } from '@/types/project';

interface PlatformLinksProps {
  links: ProjectLink[];
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.365 1.43c0 1.14-.42 2.216-1.124 3.02-.76.866-2.004 1.535-3.083 1.45-.137-1.094.391-2.23 1.078-2.95.76-.8 2.07-1.39 3.129-1.52ZM20.228 17.15c-.506 1.16-.75 1.676-1.4 2.7-.91 1.438-2.195 3.23-3.786 3.246-1.411.014-1.775-.943-3.69-.93-1.916.01-2.318.947-3.73.93-1.59-.015-2.807-1.63-3.717-3.07-2.547-4.02-2.814-8.737-1.244-11.247 1.114-1.785 2.876-2.83 4.535-2.83 1.685 0 2.744.95 4.136.95 1.35 0 2.174-.953 4.12-.953 1.47 0 3.03.8 4.144 2.186-3.64 1.998-3.05 7.196.632 9.018Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path
        d="M4.3 3.1 14.7 12 4.3 20.9c-.2-.4-.3-.9-.3-1.5V4.6c0-.6.1-1.1.3-1.5Z"
        fill="currentColor"
      />
      <path
        d="m15.7 12.9 2.4 2-10.5 6.2c-.8.5-1.6.5-2.2.2L15.7 12.9Z"
        fill="currentColor"
        opacity="0.72"
      />
      <path
        d="m18.1 9.1-2.4 2L5.4 2.7c.6-.3 1.4-.3 2.2.2l10.5 6.2Z"
        fill="currentColor"
        opacity="0.52"
      />
      <path
        d="M20.1 10.3c1.2.7 1.2 2 0 2.7l-1.1.6-2.6-2.1L19 9.4l1.1.9Z"
        fill="currentColor"
        opacity="0.88"
      />
    </svg>
  );
}

export default function PlatformLinks({
  links,
}: PlatformLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="platform-links">
      {links.map((link) => {
        const commonProps = {
          href: link.url,
          target: '_blank',
          rel: 'noreferrer',
        };

        if (link.platform === 'appStore') {
          return (
            <a
              key={link.platform}
              {...commonProps}
              className="platform-link"
              aria-label="App Store"
              title="App Store"
            >
              <AppleIcon />
            </a>
          );
        }

        if (link.platform === 'googlePlay') {
          return (
            <a
              key={link.platform}
              {...commonProps}
              className="platform-link"
              aria-label="Google Play"
              title="Google Play"
            >
              <GooglePlayIcon />
            </a>
          );
        }

        return (
          <a
            key={link.platform}
            {...commonProps}
            className="platform-link"
            aria-label="Website"
            title="Website"
          >
            <Globe2 size={18} strokeWidth={1.8} />
          </a>
        );
      })}
    </div>
  );
}