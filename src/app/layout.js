"use client";
import "./globals.css";
import React from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import Main from "./main/layout";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeConfig from "./theme";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SettingsProvider>
            <ThemeConfig>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <CssBaseline />
                <Main>{children}</Main>
              </SnackbarProvider>
            </ThemeConfig>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
