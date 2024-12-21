import type {} from '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    primary_outlined: true;
    secondary: true;
    secondary_outlined: true;
    tertiary: true;
    tertiary_outlined: true;
  }
}

import type {} from '@mui/material/TextField';

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    primary: true;
  }
}
