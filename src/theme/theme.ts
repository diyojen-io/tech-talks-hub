'use client';
import { createTheme } from '@mui/material/styles';
import typography from './typography';
import palette from './palette';
import shape from './shape';
<<<<<<< Updated upstream
import { Button, TextField, InputLabel, MenuItem } from './overrides';
=======
import buttons from './buttons';
>>>>>>> Stashed changes

export const theme = createTheme({
  spacing: 4,
  palette: palette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  shape: shape,
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  typography: typography,
  components: {
<<<<<<< Updated upstream
    MuiButton: Button,
    MuiTextField: TextField,
    MuiInputLabel: InputLabel,
    MuiMenuItem: MenuItem,
=======
    MuiButton: buttons,
>>>>>>> Stashed changes
  },
});