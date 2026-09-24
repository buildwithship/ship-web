export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

export interface AuthAccount extends AuthUser {
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  name: string;
  username: string;
}