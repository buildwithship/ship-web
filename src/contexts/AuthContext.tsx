'use client';

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';

import {
  AuthAccount,
  AuthUser,
  SignUpInput,
} from '@/types/auth';

const SESSION_KEY =
  'ship-auth-session';

const ACCOUNTS_KEY =
  'ship-auth-accounts';

const AUTH_EVENT =
  'ship-auth-change';

const demoAccount: AuthAccount = {
  id: 'user-uptomaster',
  email: 'demo@ship.dev',
  password: '12345678',
  name: '이남혁',
  username: 'uptomaster',
  avatarUrl:
    '/images/makers/uptomaster.jpg',
};

interface AuthContextValue {
  user: AuthUser | null;

  login: (
    email: string,
    password: string,
  ) => Promise<void>;

  signup: (
    input: SignUpInput,
  ) => Promise<void>;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | null>(
    null,
  );

function subscribe(
  callback: () => void,
) {
  if (
    typeof window === 'undefined'
  ) {
    return () => {};
  }

  const handleStorage = () => {
    callback();
  };

  const handleAuthChange = () => {
    callback();
  };

  window.addEventListener(
    'storage',
    handleStorage,
  );

  window.addEventListener(
    AUTH_EVENT,
    handleAuthChange,
  );

  return () => {
    window.removeEventListener(
      'storage',
      handleStorage,
    );

    window.removeEventListener(
      AUTH_EVENT,
      handleAuthChange,
    );
  };
}

function getSessionSnapshot() {
  if (
    typeof window === 'undefined'
  ) {
    return '';
  }

  return (
    window.localStorage.getItem(
      SESSION_KEY,
    ) ?? ''
  );
}

function getServerSnapshot() {
  return '';
}

function parseSession(
  raw: string,
): AuthUser | null {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(
      raw,
    ) as AuthUser;
  } catch {
    return null;
  }
}

function getAccounts(): AuthAccount[] {
  if (
    typeof window === 'undefined'
  ) {
    return [demoAccount];
  }

  const raw =
    window.localStorage.getItem(
      ACCOUNTS_KEY,
    );

  if (!raw) {
    return [demoAccount];
  }

  try {
    const accounts =
      JSON.parse(
        raw,
      ) as AuthAccount[];

    const hasDemo =
      accounts.some(
        (account) =>
          account.id ===
          demoAccount.id,
      );

    return hasDemo
      ? accounts
      : [
          demoAccount,
          ...accounts,
        ];
  } catch {
    return [demoAccount];
  }
}

function saveAccounts(
  accounts: AuthAccount[],
) {
  window.localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(accounts),
  );
}

function saveSession(
  user: AuthUser,
) {
  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(user),
  );

  window.dispatchEvent(
    new Event(AUTH_EVENT),
  );
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionRaw =
    useSyncExternalStore(
      subscribe,
      getSessionSnapshot,
      getServerSnapshot,
    );

  const user = useMemo(
    () =>
      parseSession(sessionRaw),
    [sessionRaw],
  );

  const value =
    useMemo<AuthContextValue>(
      () => ({
        user,

        login: async (
          email,
          password,
        ) => {
          const normalizedEmail =
            email
              .trim()
              .toLowerCase();

          const account =
            getAccounts().find(
              (item) =>
                item.email.toLowerCase() ===
                normalizedEmail,
            );

          if (!account) {
            throw new Error(
              '등록되지 않은 이메일입니다.',
            );
          }

          if (
            account.password !==
            password
          ) {
            throw new Error(
              '비밀번호가 일치하지 않습니다.',
            );
          }

          const {
            password:
              _password,
            ...authUser
          } = account;

          void _password;

          saveSession(authUser);
        },

        signup: async (
          input,
        ) => {
          const accounts =
            getAccounts();

          const email =
            input.email
              .trim()
              .toLowerCase();

          const username =
            input.username
              .trim()
              .replace(/^@/, '')
              .toLowerCase();

          if (
            accounts.some(
              (account) =>
                account.email.toLowerCase() ===
                email,
            )
          ) {
            throw new Error(
              '이미 사용 중인 이메일입니다.',
            );
          }

          if (
            accounts.some(
              (account) =>
                account.username.toLowerCase() ===
                username,
            )
          ) {
            throw new Error(
              '이미 사용 중인 사용자 이름입니다.',
            );
          }

          const account: AuthAccount =
            {
              id: `user-${Date.now()}`,
              email,
              password:
                input.password,
              name:
                input.name.trim(),
              username,
            };

          saveAccounts([
            ...accounts,
            account,
          ]);

          const {
            password:
              _password,
            ...authUser
          } = account;

          void _password;

          saveSession(authUser);
        },

        logout: () => {
          window.localStorage.removeItem(
            SESSION_KEY,
          );

          window.dispatchEvent(
            new Event(
              AUTH_EVENT,
            ),
          );
        },
      }),
      [user],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider.',
    );
  }

  return context;
}