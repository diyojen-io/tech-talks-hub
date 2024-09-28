"use client";

import React from 'react';
import { useModalContext } from '../context/ModalContext';
import LoginModal from '@/app/modals/LoginModal/LoginModal';
import SignUpModal from "@/app/modals/SignUpModal/SignUpModal";

const ModalContainer: React.FC = () => {
  const { isModalOpen, closeModal } = useModalContext();

  return (
    <>
      <LoginModal onClose={() => closeModal('login')} isOpen={isModalOpen('login')} />
      <SignUpModal onClose={() => closeModal('signup')}  isOpen={isModalOpen('signup')}/>
    </>
  );
};

export default ModalContainer;
