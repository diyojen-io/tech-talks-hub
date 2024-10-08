"use client";
import { ReactNode } from "react";
import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
//
import { FIREBASE_API, ADMIN_EMAILS } from "../../config";

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any | null;
}

interface AuthAction {
  type: string;
  payload: {
    isAuthenticated: boolean;
    user: any | null;
  };
}

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === "INITIALISE") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

interface AuthContextType extends AuthState {
  method: string;
  user: {
    id: string | null;
    email: string | null;
    photoURL: string | null;
    displayName: string | null;
    role: string;
    phoneNumber: string;
    country: string;
    address: string;
    state: string;
    city: string;
    zipCode: string;
    about: string;
    isPublic: boolean;
  } | null;
  login: (email: string, password: string) => Promise<any>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: "firebase",
  user: null,
  login: (email: string, password: string) => Promise.resolve(),
  register: (username: string, email: string, password: string) =>
    Promise.resolve(),
  logout: () => Promise.resolve(),
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

  interface UserProfile {
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

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          console.log("user: ", user);
          const userRef = doc(DB, "users", user.uid);

          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }

          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  interface LoginFunction {
    (email: string, password: string): Promise<any>;
  }

  const login: LoginFunction = (email, password) =>
    signInWithEmailAndPassword(AUTH, email, password);

  interface RegisterFunction {
    (username: string, email: string, password: string): Promise<any>;
  }

  const register: RegisterFunction = (username, email, password) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, "users"), res.user?.uid);

      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        username,
      });
    });

  const logout = () => signOut(AUTH);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: {
          id: state?.user?.uid,
          email: state?.user?.email,
          photoURL: state?.user?.photoURL || profile?.photoURL,
          displayName: state?.user?.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(state?.user?.email) ? "admin" : "user",
          phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || "",
          country: profile?.country || "",
          address: profile?.address || "",
          state: profile?.state || "",
          city: profile?.city || "",
          zipCode: profile?.zipCode || "",
          about: profile?.about || "",
          isPublic: profile?.isPublic || false,
        },
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

  if (!context) throw new Error("Auth context must be use inside AuthProvider");

  return context;
};

export default useAuth;
