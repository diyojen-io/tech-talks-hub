import { ADMIN_EMAILS, FIREBASE_API } from '@/config';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  updatePassword as firebaseUpdatePassword,
  updateProfile as firebaseUpdateProfile,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  getDocs,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

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

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: IUser | null;
  isLoading: boolean;
}

interface AuthAction {
  type: string;
  payload: {
    isAuthenticated: boolean;
    user: IUser | null;
    isLoading: boolean;
  };
}

interface IUser {
  id: string | null;
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

interface AuthContextType extends AuthState {
  method: string;
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  create: (collectionName: string, data: any) => Promise<void>;
  getAll: (collectionName: string) => Promise<any[]>;
  update: (
    collectionName: string,
    id: string,
    data: any,
    merge?: boolean,
    isPasswordUpdate?: boolean,
  ) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<IUser>) => Promise<void>;
}

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user, isLoading } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      isLoading,
    };
  }

  return state;
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: 'firebase',
  user: null,
  login: (email: string, password: string) => Promise.resolve(),
  register: (username: string, email: string, password: string) =>
    Promise.resolve(),
  logout: () => Promise.resolve(),
  create: (collectionName: string, data: any) => Promise.resolve(),
  getAll: (collectionName: string) => Promise.resolve([]),
  update: (collectionName: string, id: string, data: any, merge = true) =>
    Promise.resolve(),
  updatePassword: (newPassword: string) => Promise.resolve(),
  updateProfile: (data: any) => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState<IUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, async (user) => {
      dispatch({
        type: 'INITIALISE',
        payload: { isAuthenticated: false, user: null, isLoading: true },
      });

      if (user) {
        const userRef = doc(DB, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data() as IUser);
        }

        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: true,
            user: AUTH.currentUser,
            isLoading: false,
          },
        });
      } else {
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: false, user: null, isLoading: false },
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(AUTH, email, password);
  };

  const register = (username: string, email: string, password: string) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, 'users'), res.user?.uid);
      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        username,
      });
    });

  const logout = () => signOut(AUTH);

  const create = async (collectionName: string, data: any) => {
    const collectionRef = doc(collection(DB, collectionName));

    data.date = new Date(data.date).getTime();
    data.time = new Date(data.time).getTime();

    await setDoc(collectionRef, {
      ...data,
      createdAt: new Date().getTime(),
    });
  };

  const getAll = async (collectionName: string) => {
    const collectionRef = collection(DB, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map((doc) => doc.data());
  };

  const update = async (
    collectionName: string,
    id: string,
    data: any,
    merge = true,
    isPasswordUpdate = false,
  ) => {
    const collectionDataRef = doc(collection(DB, collectionName), id);
    if (isPasswordUpdate) {
      await setDoc(
        collectionDataRef,
        { password: data.password, updatedAt: new Date().getTime() },
        { merge },
      );
    } else {
      await setDoc(
        collectionDataRef,
        { ...data, updatedAt: new Date().getTime() },
        { merge },
      );
    }
  };

  const updatePassword = async (newPassword: string) => {
    const user = AUTH.currentUser;

    if (!user) {
      return;
    }

    await firebaseUpdatePassword(user, newPassword);
  };

  const updateProfile = async (data: Partial<IUser>) => {
    const user = AUTH.currentUser;
    if (user) {
      await firebaseUpdateProfile(user, data);
      setProfile((prev) => ({ ...prev, ...data }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: state?.user?.uid,
          email: state?.user?.email || null,
          photoURL: state?.user?.photoURL || profile?.photoURL,
          displayName: state?.user?.displayName || profile?.displayName,
          username: state?.user?.username || profile?.username,
          birthDay: profile?.birthDay ? new Date(profile.birthDay) : null,
          location: profile?.location || '',
          role: ADMIN_EMAILS.includes(state?.user?.email) ? 'admin' : 'user',
          phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || '',
          isPublic: profile?.isPublic || false,
          twitter: profile?.twitter || null,
          instagram: profile?.instagram || null,
          linkedin: profile?.linkedin || null,
          github: profile?.github || null,
        },
        login,
        register,
        logout,
        create,
        getAll,
        update,
        updatePassword,
        updateProfile,
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
