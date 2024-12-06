import { User } from 'firebase/auth';

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser | null;
  isLoading: boolean;
}

export interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload: {
    isAuthenticated: boolean;
    user: IUser | null;
    isLoading: boolean;
  };
}

export interface TAuthParams {
  username: string;
  email: string;
  password: string;
}

export interface IUser
  extends Omit<
      Partial<UserProfile>,
      'displayName' | 'phoneNumber' | 'photoURL'
    >,
    Partial<User> {
  id: string | null;
  email: string | null;
  role: string;
}

export interface UserProfile {
  photoURL?: string;
  displayName?: string;
  username?: string;
  phoneNumber?: string;
  country?: string;
  address?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  about?: string;
  isPublic?: boolean;
}
