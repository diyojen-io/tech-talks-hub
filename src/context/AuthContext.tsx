'use client';
import { ProviderProps, ReactNode } from 'react';
import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
//
import { FIREBASE_API, ADMIN_EMAILS } from '@/config';
import { AuthAction, AuthState, IUser, TAuthParams, UserProfile } from './data';

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isLoading: true,
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN': {
      const { isAuthenticated, user, isLoading } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        isLoading,
      };
    }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  method: string;
  user: IUser | null;
  login?: (params: Omit<TAuthParams, 'username'>) => Promise<UserCredential>;
  register?: (params: TAuthParams) => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: 'firebase',
  user: null,
});

// ----------------------------------------------------------------------

function AuthProvider({ children }: Omit<ProviderProps<ReactNode>, 'value'>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, async (user) => {
      try {
        dispatch({
          type: 'LOGOUT',
          payload: { isAuthenticated: false, user: null, isLoading: true },
        });

        if (user) {
          const userRef = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }

          dispatch({
            type: 'LOGIN',
            payload: {
              isAuthenticated: true,
              user: {
                id: AUTH.currentUser?.uid || null,
                email: AUTH.currentUser?.email || null,
                photoURL: AUTH.currentUser?.photoURL || profile?.photoURL,
                displayName: AUTH.currentUser?.displayName || profile?.username,
                role:
                  AUTH.currentUser?.email &&
                  ADMIN_EMAILS.includes(AUTH.currentUser?.email)
                    ? 'admin'
                    : 'user',
                phoneNumber:
                  AUTH.currentUser?.phoneNumber || profile?.phoneNumber || '',
                country: profile?.country || '',
                address: profile?.address || '',
                state: profile?.state || '',
                city: profile?.city || '',
                zipCode: profile?.zipCode || '',
                about: profile?.about || '',
                isPublic: profile?.isPublic || false,

                ...AUTH.currentUser,
              },
              isLoading: false,
            },
          });
        } else {
          dispatch({
            type: 'LOGOUT',
            payload: { isAuthenticated: false, user: null, isLoading: false },
          });
        }
      } catch {
        console.log('login_error');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const login = ({ email, password }: Omit<TAuthParams, 'username'>) =>
    signInWithEmailAndPassword(AUTH, email, password);

  const register = async ({
    username,
    email,
    password,
  }: TAuthParams): Promise<void> => {
    try {
      const res = await createUserWithEmailAndPassword(AUTH, email, password);

      const userRef = doc(collection(DB, 'users'), res.user?.uid);
      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        username,
      });
      return Promise.resolve();
    } catch (error) {
      console.log('Registration failed:', error);
      return Promise.reject(error);
    }
  };

  const logout = () => signOut(AUTH);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('Auth context must be used inside AuthProvider');

  return context;
};

export default useAuth;
