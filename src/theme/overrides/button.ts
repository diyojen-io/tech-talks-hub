import { Components } from '@mui/material';
import shape from '../shape';
import { GREY, PRIMARY } from '../palette';

const Button: Components['MuiButton'] = {
  defaultProps: {
    variant: 'primary',
  },
  styleOverrides: {
    root: {
      fontSize: 16,
      borderRadius: shape.borderRadius,
      textTransform: 'none',
      boxShadow: '0px 8px 16px rgba(5, 107, 253, 0.25)',
      transition: ' background-color 0.6s ease',
    },
    sizeSmall: {
      padding: '2px 4px',
      fontSize: 12,
      borderRadius: 4,
    },
    sizeMedium: {
      minWidth: 95,
    },
    sizeLarge: {
      width: '100%',
    },
  },

  variants: [
    {
      props: { variant: 'primary' },
      style: {
        color: 'black',
        backgroundColor: PRIMARY.main,
        '&:hover': {
          color: GREY['0'],
        },
        '&:active': {
          backgroundColor: PRIMARY.dark,
        },
        ':disabled': {
          backgroundColor: GREY[500],
          color: '#fff',
        },
      },
    },
    {
      props: { variant: 'contained' },
      style: {
        backgroundColor: PRIMARY.main,
        color: GREY['0'],
        '&:hover': {
          backgroundColor: PRIMARY.dark,
        },
        '&:active': {
          backgroundColor: PRIMARY.dark,
        },
        ':disabled': {
          backgroundColor: GREY[500],
          color: '#fff',
        },
      },
    },
    {
      props: { variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: PRIMARY.main,
        border: `2px solid ${PRIMARY.main}`,
        '&:hover': {
          backgroundColor: PRIMARY.main,
          color: 'white',
        },
        '&:active': {
          backgroundColor: PRIMARY.dark,
        },
        ':disabled': {
          backgroundColor: GREY[500],
          color: '#fff',
        },
      },
    },
  ],
};

export default Button;
