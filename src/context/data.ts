import { User } from 'firebase/auth';

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser | null;
  isLoading: boolean;
}

export interface AuthAction {
  type: string;
  payload: {
    isAuthenticated: boolean;
    user: IUser | null;
    isLoading: boolean;
  };
}

export interface IUser extends Partial<User> {
  id: string | null | undefined;
  email: string | null;
  photoURL?: string | null;
  displayName?: string | null;
  username?: string | null;
  birthDay?: Date | null;
  location?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  github?: string | null;
  role?: string;
  phoneNumber?: string;
  country?: string;
  address?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  about?: string;
  isPublic?: boolean;
}
