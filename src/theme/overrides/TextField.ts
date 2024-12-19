import { Components } from '@mui/material';

const textFields: Components['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
    margin: 'dense',
    size: 'small',
  },
  styleOverrides: {
    root: {
      borderRadius: 8,
      input: {
        fontSize: 16,
      },
    },
  },
};

export default textFields;
