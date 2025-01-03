import { Components } from '@mui/material';
import shape from '../shape';

const buttons: Components['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
  },
  styleOverrides: {
    root: {
      borderRadius: shape.borderRadius,
      textTransform: 'none',
    },
  },
};

export default buttons;
