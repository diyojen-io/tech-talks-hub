import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const handlers = {
  LOGIN: (state, { payload }) => ({
    ...state,
    user: { payload },
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  const login = async (data) => {
    dispatch({ type: "LOGIN", payload: data.email });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: {
          email: state.user,
          role: "owner",
        },
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
