"use client";
import { createContext, useEffect, useReducer, useState } from "react";
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
  DocumentData,
} from "firebase/firestore";
//
import { FIREBASE_API, ADMIN_EMAILS } from "@/config";

// ----------------------------------------------------------------------

interface User {
  id: string;
  email: string;
  photoURL: string;
  displayName: string;
  role: string;
  phoneNumber: string;
  country: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  about: string;
  isPublic: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User;
}

interface AuthAction {
  type: string;
  payload: any;
}

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: AuthState, action: AuthAction) => {
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

const AuthContext = createContext({
  ...initialState,
  method: "firebase",
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState<null | DocumentData>(null);

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
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

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(AUTH, email, password);

  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, "users"), res.user?.uid);

      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        displayName: `${firstName} ${lastName}`,
      });
    });

  const logout = () => signOut(AUTH);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "firebase",
        user: state.user
          ? {
              ...state.user,
              ...profile,
            }
          : null,
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
