import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';

function Button(props: ButtonProps) {
  return <MUIButton {...props}></MUIButton>;
}

export default Button;
