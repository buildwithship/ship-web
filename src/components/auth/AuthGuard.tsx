'use client';

import {
  useEffect,
} from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { Lock } from 'lucide-react';

import {
  useAuth,
} from '@/contexts/AuthContext';

import styles from './AuthGuard.module.css';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const { user } = useAuth();

  const pathname =
    usePathname();

  const router =
    useRouter();

  useEffect(() => {
    if (user) {
      return;
    }

    const next =
      encodeURIComponent(
        pathname,
      );

    router.replace(
      `/login?next=${next}`,
    );
  }, [
    pathname,
    router,
    user,
  ]);

  if (!user) {
    return (
      <div
        className={
          styles.loading
        }
      >
        <div
          className={
            styles.icon
          }
        >
          <Lock
            size={21}
            strokeWidth={2}
          />
        </div>

        <strong>
          로그인을 확인하고 있습니다.
        </strong>
      </div>
    );
  }

  return children;
}