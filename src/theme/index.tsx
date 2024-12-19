import { StyledEngineProvider, ThemeProvider } from '@mui/material';
<<<<<<< Updated upstream
import { ReactElement } from 'react';
=======
import React, { ReactElement, ReactNode } from 'react';
>>>>>>> Stashed changes
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
