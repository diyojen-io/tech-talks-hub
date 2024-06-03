"use client";
import PropTypes from "prop-types";
import useSettings from "../hooks/useSettings";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import palette from "./palette";
import breakpoints from "./breakpoints";
import typography from "./typography";

function ThemeConfig({ children }) {
  const { themeMode } = useSettings();

  const isLightTheme = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLightTheme ? palette.light : palette.dark,
      typography: typography,
      breakpoints: breakpoints,
    }),
    [isLightTheme]
  );

  const theme = createTheme(themeOptions);

  console.log("theme", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ThemeConfig.propTypes = {
  children: PropTypes.node,
};

export default ThemeConfig;
