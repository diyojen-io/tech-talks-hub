import "./globals.css";
import React from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import Main from "./main/layout";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeConfig from "./theme";

export const metadata = {
  title: "Main Page",
  description: "Main Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          <ThemeConfig>
            <CssBaseline />
            <Main>{children}</Main>
          </ThemeConfig>
        </SettingsProvider>
      </body>
    </html>
  );
}
