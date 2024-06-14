"use client";
import "./globals.css";
import React from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import Main from "./main/layout";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeConfig from "./theme";
import { SnackbarProvider } from "notistack";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
