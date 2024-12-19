import type {} from '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
}

import type {} from '@mui/material/TextField';

declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    primary: true;
  }
}
