"use client";
import PropTypes from "prop-types";
import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  themeMode: "light",
  onChangeMode: () => {},
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node,
};
function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: initialState.themeMode,
  });

  const onChangeMode = (value) => {
    setSettings({
      ...settings,
      themeMode: value,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        onChangeMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
