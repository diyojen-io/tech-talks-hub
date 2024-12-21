import { Components } from '@mui/material';
import { primary, secondary, black } from '../palette';

const buttons: Components['MuiButton'] = {
  defaultProps: {
    disableRipple: true,
    variant: 'primary',
    size: 'medium',
  },
  styleOverrides: {
    root: {
      borderRadius: 6,
      fontWeight: '600',
      textTransform: 'none',
      lineHeight: '20px',
    },
    sizeSmall: {
      padding: '4px 12px',
      fontSize: 12,
    },
    sizeMedium: {
      padding: '8px 16px',
      fontSize: 14,
    },
    sizeLarge: {
      padding: '16px 24px',
      fontSize: 16,
    },
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        backgroundColor: primary.main,
        color: '#ffffff',
        '&:hover': {
          backgroundColor: primary.dark,
          opacity: 0.8,
        },
        '&:disabled': {
          backgroundColor: primary.disabled,
          color: secondary.light,
        },
      },
    },
    {
      props: { variant: 'primary_outlined' },
      style: {
        backgroundColor: 'transparent',
        color: primary.main,
        border: `1px solid ${primary.main}`,
        '&:hover': {
          backgroundColor: primary.main,
          color: '#ffffff',
          transition: 'background-color 0.3s',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          color: primary.disabled,
          border: `1px solid ${primary.disabled}`,
        },
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        backgroundColor: black.main,
        color: '#ffffff',
        '&:hover': {
          backgroundColor: black.dark,
          opacity: 0.8,
        },
        '&:disabled': {
          backgroundColor: black.disabled,
          color: secondary.light,
        },
      },
    },
    {
      props: { variant: 'secondary_outlined' },
      style: {
        backgroundColor: 'transparent',
        color: black.main,
        border: `1px solid ${black.main}`,
        '&:hover': {
          backgroundColor: black.main,
          color: '#ffffff',
          opacity: 0.8,
          transition: 'background-color 0.3s',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          color: black.disabled,
          border: `1px solid ${black.disabled}`,
        },
      },
    },
    {
      props: { variant: 'tertiary' },
      style: {
        backgroundColor: secondary.light,
        color: black.main,
        border: `1px solid ${black.main}`,
        '&:hover': {
          backgroundColor: secondary.light,
          color: black.main,
          opacity: 0.8,
        },
        '&:disabled': {
          backgroundColor: secondary.disabled,
          color: black.disabled,
          border: `1px solid ${secondary.disabled}`,
        },
      },
    },
    {
      props: { variant: 'tertiary_outlined' },
      style: {
        backgroundColor: black.main,
        color: secondary.light,
        border: `1px solid ${black.main}`,
        '&:hover': {
          backgroundColor: secondary.light,
          color: black.main,
          border: `1px solid ${black.main}`,
          opacity: 0.8,
          transition: 'background-color 0.3s',
        },
        '&:disabled': {
          backgroundColor: black.disabled,
          color: secondary.disabled,
          border: `1px solid ${black.disabled}`,
        },
      },
    },
  ],
};

export default buttons;
