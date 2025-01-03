import { Components } from '@mui/material';
import shape from './shape';

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
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        backgroundColor: '#ff6700',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#cc5200',
        },
      },
    },
  ],
};

export default buttons;
