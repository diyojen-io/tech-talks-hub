import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import { theme } from './theme';

interface ThemeConfigProps {
  children: ReactElement;
}

function ThemeConfigProvider({ children }: ThemeConfigProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}

export default ThemeConfigProvider;
