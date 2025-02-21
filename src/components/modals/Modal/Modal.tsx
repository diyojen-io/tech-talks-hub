import React from 'react';
import { Modal as MUIModal, ModalProps } from '@mui/material';
import { ModalSlot } from './styled';

interface IModalProps extends ModalProps {
  hasCloseBtn?: boolean; //ornek
}

function Modal({ children, slotProps, ...rest }: IModalProps) {
  return (
    <MUIModal {...rest}>
      <ModalSlot {...slotProps}>{children}</ModalSlot>
    </MUIModal>
  );
}

export default Modal;
