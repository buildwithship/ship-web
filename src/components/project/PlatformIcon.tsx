export type PlatformIconName =
  | 'web'
  | 'website'
  | 'ios'
  | 'appStore'
  | 'android'
  | 'googlePlay';

interface PlatformIconProps {
  name: PlatformIconName;
  size?: number;
}

function WebIcon({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="#2E8BE6"
      />

      <path
        d="M3.7 12h16.6M12 3c2.3 2.45 3.5 5.45 3.5 9S14.3 18.55 12 21M12 3C9.7 5.45 8.5 8.45 8.5 12s1.2 6.55 3.5 9"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AppStoreIcon({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        width="24"
        height="24"
        rx="6"
        fill="#0A84FF"
      />

      <path
        d="M8.1 17.4 12 6.6m3.9 10.8L12 6.6M6.5 14h11"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AndroidIcon({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M7 9.2h10a4 4 0 0 1 4 4V18H3v-4.8a4 4 0 0 1 4-4Z"
        fill="#3DDC84"
      />

      <path
        d="M7.6 9 5.9 6.4M16.4 9l1.7-2.6"
        stroke="#3DDC84"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="8"
        cy="12.4"
        r="1"
        fill="#fff"
      />

      <circle
        cx="16"
        cy="12.4"
        r="1"
        fill="#fff"
      />

      <path
        d="M6 18v3M18 18v3"
        stroke="#3DDC84"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GooglePlayIcon({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4.4 3.3 14.4 12 4.4 20.7c-.25-.45-.4-.95-.4-1.55V4.85c0-.6.15-1.1.4-1.55Z"
        fill="#34A853"
      />

      <path
        d="m14.4 12 3.1-2.7L8 3.8c-1.08-.63-2.05-.8-2.82-.5L14.4 12Z"
        fill="#4285F4"
      />

      <path
        d="m14.4 12-9.22 8.7c.77.3 1.74.13 2.82-.5l9.5-5.5-3.1-2.7Z"
        fill="#FBBC04"
      />

      <path
        d="m17.5 9.3 2.8 1.62c1.23.72 1.23 1.44 0 2.16l-2.8 1.62L14.4 12l3.1-2.7Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function PlatformIcon({
  name,
  size = 18,
}: PlatformIconProps) {
  if (
    name === 'web' ||
    name === 'website'
  ) {
    return <WebIcon size={size} />;
  }

  if (
    name === 'ios' ||
    name === 'appStore'
  ) {
    return <AppStoreIcon size={size} />;
  }

  if (name === 'android') {
    return <AndroidIcon size={size} />;
  }

  return <GooglePlayIcon size={size} />;
}