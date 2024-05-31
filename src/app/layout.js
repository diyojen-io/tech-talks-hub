import "./globals.css";
import React from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import Main from "./main/layout";
import ThemeConfig from "./theme";

export default function RootLayout({ children }) {
  return (
    <SettingsProvider>
      <ThemeConfig>
        <Main>{children}</Main>
      </ThemeConfig>
    </SettingsProvider>
  );
}
